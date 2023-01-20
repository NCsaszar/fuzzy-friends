import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { allUsersRoute, host } from '../utils/APIRoutes';

import MatchList from '../components/chat/MatchList';
import ChatBox from '../components/chat/ChatBox';
import ProfileBox from '../components/chat/ProfileBox';

const ChatPage: React.FC = ({ user }) => {
  // const [user, setUser] = useState<User>({
  //   _id: '9',
  //   name: 'Henry',
  //   age: 7,
  //   breed: 'Golden Retriever',
  //   gender: 'male',
  //   profilePic:
  //     'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  //   pictures: [
  //     'https://images.unsplash.com/photo-1611003229186-80e40cd54966?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  //     'https://images.unsplash.com/photo-1591160690567-a6b0215b67ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
  //   ],
  //   calendarInvite: [],
  //   description: 'Hello my name is Henry, and I would love to chat with you!',
  // });

  const [mate, setMate] = useState<Mate>({});

  const [currentChat, setCurrentChat] = useState([]);

  // const [matches, setMatches] = useState<Match[]>([
  //   {
  //     _id: '1',
  //     name: 'Sophie',
  //     age: 4,
  //     breed: 'Siberian Husky',
  //     gender: 'female',
  //     profilePic:
  //       'https://canineowners.com/wp-content/uploads/2016/06/Corgi-Husky.png',
  //     pictures: [
  //       'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-2-150x150.jpg',
  //       'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-1.jpg',
  //       'https://i.pinimg.com/236x/56/e8/ba/56e8ba281d0cce55c4db6e3ee10f0ea4--happy-puppy-puppy-love.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'Hey there! My name is Sophie!',
  //   },
  //   {
  //     _id: '2',
  //     name: 'Kuma',
  //     age: 3,
  //     breed: 'Goldendoodle',
  //     gender: 'male',
  //     profilePic:
  //       'https://www.rainfieldgoldendoodles.com/wp-content/uploads/2019/11/20191118_162055-1-200x300.jpg',
  //     pictures: [
  //       'https://www.happygodoodle.com/wp-content/uploads/2022/04/apricot-colored-miniature-goldendoodle-720x720.jpg.webp',
  //       'https://a-z-animals.com/media/2021/06/Petite-Goldendoodle-puppy-1024x535.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'I like warm hugs',
  //   },
  //   {
  //     _id: '4',
  //     name: 'dog',
  //     age: 2,
  //     breed: 'shih tzu',
  //     gender: 'male',
  //     profilePic:
  //       'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F07%2F21%2Fdogo-argentino-lying-on-cement-1309087955-2000.jpg',
  //     pictures: [
  //       'https://www.akc.org/wp-content/uploads/2017/11/Dogo-Argentino.jpg',
  //       'https://i.pinimg.com/originals/8b/ee/0b/8bee0bf219b91167f191f5268febae96.jpg',
  //       'http://3.bp.blogspot.com/-7pNCBrtPl_A/TaeOAW-3_xI/AAAAAAAA8_s/F4oAN5WLAug/s1600/Dogo.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'Hello, my name is dog.',
  //   },
  //   {
  //     _id: '5',
  //     name: 'cat',
  //     age: 4,
  //     breed: 'maltese',
  //     gender: 'female',
  //     profilePic:
  //       'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F12%2Fpomeranian-white-puppy-921029690-2000.jpg',
  //     pictures: [
  //       'https://cdn.britannica.com/41/233841-050-4FFECCF1/Pomeranian-dog.jpg',
  //       'https://www.omlet.us/images/cache/1024/693/Dog-Pomeranian-Three_lovely_Pomeranians,_each_with_big,_bushy_tails_and_beautiful_pointed_ears.jpg',
  //       'https://www.allthingsdogs.com/wp-content/uploads/2020/01/White-Pomeranian-Feature-678x381.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'I am a cat, but I like to hang out with dogs.',
  //   },
  // ]);

  // const [tempMatches, setTempMatches] = useState<TempMatch[]>([
  //   {
  //     _id: '1',
  //     name: 'Sophie',
  //     age: 4,
  //     breed: 'Siberian Husky',
  //     gender: 'female',
  //     profilePic:
  //       'https://canineowners.com/wp-content/uploads/2016/06/Corgi-Husky.png',
  //     pictures: [
  //       'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-2-150x150.jpg',
  //       'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-1.jpg',
  //       'https://i.pinimg.com/236x/56/e8/ba/56e8ba281d0cce55c4db6e3ee10f0ea4--happy-puppy-puppy-love.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'Hey there! My name is Sophie!',
  //   },
  //   {
  //     _id: '2',
  //     name: 'Kuma',
  //     age: 3,
  //     breed: 'Goldendoodle',
  //     gender: 'male',
  //     profilePic:
  //       'https://www.rainfieldgoldendoodles.com/wp-content/uploads/2019/11/20191118_162055-1-200x300.jpg',
  //     pictures: [
  //       'https://www.happygodoodle.com/wp-content/uploads/2022/04/apricot-colored-miniature-goldendoodle-720x720.jpg.webp',
  //       'https://a-z-animals.com/media/2021/06/Petite-Goldendoodle-puppy-1024x535.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'I like warm hugs',
  //   },
  //   {
  //     _id: '4',
  //     name: 'dog',
  //     age: 2,
  //     breed: 'shih tzu',
  //     gender: 'male',
  //     profilePic:
  //       'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F07%2F21%2Fdogo-argentino-lying-on-cement-1309087955-2000.jpg',
  //     pictures: [
  //       'https://www.akc.org/wp-content/uploads/2017/11/Dogo-Argentino.jpg',
  //       'https://i.pinimg.com/originals/8b/ee/0b/8bee0bf219b91167f191f5268febae96.jpg',
  //       'http://3.bp.blogspot.com/-7pNCBrtPl_A/TaeOAW-3_xI/AAAAAAAA8_s/F4oAN5WLAug/s1600/Dogo.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'Hello, my name is dog.',
  //   },
  //   {
  //     _id: '5',
  //     name: 'cat',
  //     age: 4,
  //     breed: 'maltese',
  //     gender: 'female',
  //     profilePic:
  //       'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F12%2Fpomeranian-white-puppy-921029690-2000.jpg',
  //     pictures: [
  //       'https://cdn.britannica.com/41/233841-050-4FFECCF1/Pomeranian-dog.jpg',
  //       'https://www.omlet.us/images/cache/1024/693/Dog-Pomeranian-Three_lovely_Pomeranians,_each_with_big,_bushy_tails_and_beautiful_pointed_ears.jpg',
  //       'https://www.allthingsdogs.com/wp-content/uploads/2020/01/White-Pomeranian-Feature-678x381.jpg',
  //     ],
  //     calendarInvite: [],
  //     description: 'I am a cat, but I like to hang out with dogs.',
  //   },
  // ]);

  const [matches, setMatches] = useState<Match[]>([]);

  const [tempMatches, setTempMatches] = useState<TempMatch[]>([]);

  useEffect(
    (req, res) => {
      console.log(user.userId, 'in chat2');
      const getUserMatchList = async () => {
        try {
          const currentUser = await axios.get(
            `http://34.238.117.39:3000/users/${user.userId}/friends`
          );
          console.log(currentUser.data, '12');
          if (currentUser.data.length !== matches.length) {
            setMatches(currentUser.data);
            setTempMatches(currentUser.data);
          }
        } catch (err) {
          console.log('err');
        }
      };

      const interval = setInterval(() => {
        getUserMatchList();
      }, 1000);
      return () => clearInterval(interval);
      // axios.get(`http://34.238.117.39:3000/users/${user.userId}/friends`);
    },
    [user]
  );
  //useEffect to check if user is logged in
  //if not logged in, then direct to log in page?
  //if logged in, setCurrentUser to user with latest message? or we display welcome message and allow user to select chat of his or her choice
  // "2023-01-20T15:13:02.201Z"
  const getChatHistory = (mateId: string) => {
    // get chat history with mateid=2
    console.log('before axios: ', user.userId, mateId);
    axios
      .get(`http://34.238.117.39:3000/users/${user.userId}/messages/${mateId}`)
      .then((data) => {
        console.log('updated chat history: ', data.data);

        setCurrentChat(data.data);
      })
      .catch((err) => {
        console.log('failed to get updated chat history: ', err);
      });
  };

  const handleMateChange = (mateInfo) => {
    console.log('changed mate info: ', mateInfo);
    setMate(mateInfo);
    // console.log('registered mate in chat.tsx: ', mateInfo._id);
    getChatHistory(mateInfo._id);
  };

  useEffect(() => {
    console.log('pleaseuser', user.userId, mate.userId);
    const interval = setInterval(() => {
      axios
        .get(
          `http://34.238.117.39:3000/users/${user.userId}/messages/${mate.userId}`
        )
        .then((data) => {
          if (data) {
            console.log('initial chat history: ', data);
            setCurrentChat(data.data);
          }
        })
        .catch((err) => {
          console.log('failed to get initial chat history: ', err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [mate]);

  // //getting someone else's friend request to me
  // useEffect(() => {
  //   axios.get(`http://54.144.2.231:3000/`);
  // });

  return (
    <div>
      <div className="flex bg-hero h-[100vh]">
        <div className="flex-1 w-20">
          <MatchList
            matches={matches}
            tempMatches={tempMatches}
            changeMate={handleMateChange}
          />
        </div>
        <div className="flex-1 w-20">
          <ChatBox currentChat={currentChat} mate={mate} user={user} />
        </div>
        <div className="flex-1 w-20">
          {/* pass down current user down to profileBox */}
          <ProfileBox mate={mate} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

// chat initial
/* [
  { userId: '1', message: 'User would like to match with you' },
  { userId: '9', message: 'Hey! Wassup?' },
  { userId: '1', message: 'Nm - wbu?' },
]
*/
