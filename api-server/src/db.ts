import mongoose from 'mongoose';

mongoose
  .connect('mongodb://127.0.0.1:27017/fuzzy-friends')
  .catch((err) => console.log('unable to open mongodb', err));

const RequestSchema = new mongoose.Schema({
  userId: String,
  senderId: String,
});

const Request = mongoose.model('Request', RequestSchema);

const ProfileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  age: Number,
  breed: String,
  gender: String,
  city: String,
  description: String,
  pictures: [String],
  friends: [String],
});
const Profile = mongoose.model('Profile', ProfileSchema);

const InvitesSchema = new mongoose.Schema(
  {
    sender: String,
    recipient: String,
    eventId: String,
    status: {
      type: String,
      enum: ['Active', 'Accepted', 'Rejected', 'Cancelled'],
    },
  },
  { timestamps: true }
);
const Invite = mongoose.model('Invite', InvitesSchema);

const EventsSchema = new mongoose.Schema({
  title: String,
  description: String,
  friend: String,
  location: String,
  start: String,
  end: String,
  date: Date,
});

export const Event = mongoose.model('Event', EventsSchema);

const UserEventsSchema = new mongoose.Schema({
  UserId: String,
  EventId: String,
});

const UserEvent = mongoose.model('UserEvent', UserEventsSchema);

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    messageContent: String,
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export const db = {
  getMessages: (senderId: string, receiverId: string) => {
    let listOfMessages: object[] = [];
    return new Promise((resolve, reject) => {
      Message.find({ senderId, receiverId })
        .then((data) => {
          listOfMessages = data;
          return Message.find({
            senderId: receiverId,
            receiverId: senderId,
          });
        })
        .then((data) => {
          listOfMessages = [...listOfMessages, ...data];
          resolve(listOfMessages);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addMessage: (
    senderId: string,
    receiverId: string,
    messageContent: string
  ) => {
    return new Promise((resolve, reject) => {
      const newMessage = new Message({ senderId, receiverId, messageContent });
      newMessage
        .save()
        .then(() => {
          resolve('Success');
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getRequests: (userId: string) => {
    return Request.find({ userId });
  },
  addRequest: (userId: string, receiverId: string) => {
    const newRequest = new Request({ userId: receiverId, senderId: userId });
    return newRequest.save();
  },
  getFriends: (userId: string) => {
    return Profile.findOne({ userId: userId }).then((data) => {
      return Profile.find({
        userId: { $in: data.friends },
      });
    });
  },
  addFriend: (userId: string, senderId: string) => {
    return new Promise((resolve, reject) => {
      Request.findOneAndRemove({ userId, senderId })
        .then(() => {
          return Profile.findOne({ userId });
        })
        .then((profile) => {
          profile.friends.push(senderId);
          return profile.save();
        })
        .then(() => {
          return Profile.findOne({ senderId });
        })
        .then((profile) => {
          profile.friends.push(userId);
          return profile.save();
        })
        .then(() => {
          resolve('Success');
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUser: (userId: string) => {
    return Profile.findOne({ userId });
  },
  addUser: (userId: string) => {
    // userId: String,
    // name: String,
    // friends: [String],
    const newUser = new Profile({ userId });
    return newUser.save();
  },
  updateProfile: (userId: string, profile: object) => {
    return Profile.findOneAndUpdate({ userId }, profile);
  },
  removeRequest: (userId: string, senderId: string) => {
    return Request.findOneAndRemove({ userId, senderId });
  },
  getProfiles: (userId: string) => {
    return Profile.find();
  },
};
