interface Match {
  _id: string;
  name: string;
  age: number;
  breed: string;
  gender: 'female' | 'male';
  profilePic: string;
  pictures: string[];
  calendarInvite: string[];
  description: string;
}
interface TempMatch {
  _id: string;
  name: string;
  age: number;
  breed: string;
  gender: 'female' | 'male';
  profilePic: string;
  pictures: string[];
  calendarInvite: string[];
  description: string;
}

interface Mate {
  _id: string;
  name: string;
  age: number;
  breed: string;
  gender: 'female' | 'male';
  profilePic: string;
  pictures: string[];
  calendarInvite: string[];
  description: string;
}

interface User {
  userId: string;
  name: string;
  age: number;
  breed: string;
  gender: 'female' | 'male';
  profilePic: string;
  pictures: string[];
  calendarInvite: string[];
  description: string;
}

interface Chat {
  createdAt: string;
  messageContent: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface PlayEvent {
  _id: string;
  userId: string;
  title: string;
  description: string;
  friend: string;
  location: string;
  date: Date;
  start: string;
  end: string;
}
