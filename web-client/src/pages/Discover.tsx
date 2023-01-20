import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from '@trendyol-js/react-carousel';
import ProfileInfo from '../components/discover/ProfileInfo';

// interface User {
//   id: number;
//   friends: [];
// }
export interface Profile {
  id: number;
  userId: number;
  pictures: string[];
  name: string;
  city: string;
}
export interface CurrentUser {
  user: Profile;
  index: number;
}
const Discovery = ({ user }) => {
  const buttonClassNames =
    'fa-solid rounded-full p-3 text-md text-white hover:cursor-pointer bg-[#494036]';
  const barkSniffClasses =
    'rounded-2xl text-md hover:cursor-pointer text-center bg-[#494036] text-white px-5 py-2 text-lg ';

  const [ranApiCall, setRanApiCall] = useState<boolean>(false);
  const [reRender, setReRender] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    user: { id: 0, userId: 0, photos: [], name: '', city: '' },
    index: 0,
  });
  console.log('USER', user);
  const [profileArray, setProfileArray] = useState<Profile[]>([]);
  console.log('PROFILE ARRAY');

  const handleBark = () => {
    if (currentUser.index !== profileArray.length) {
      setCurrentUser({
        user: profileArray[currentUser.index + 1],
        index: (currentUser.index += 1),
      });
      setReRender(true);
    } else {
      setCurrentUser({
        user: profileArray[0],
        index: 0,
      });
      setReRender(true);
    }

  };

  const handleSniff = () => {
    axios
      .post(
        `http://34.238.117.39:3000/users/${user.userId}/friends/${currentUser.user.userId}`
      )
      .then(() => {
        const newUser = {
          user: profileArray[currentUser.index + 1],
          index: (currentUser.index += 1),
        };
        setCurrentUser(newUser);
        setReRender(true);
        console.log('NEW PHOTOS', currentUser.user.photos);
      });
  };

  useEffect(() => {
    setRanApiCall(false);
    axios
      .get(`http://34.238.117.39:3000/users/${user.userId}/discover`)
      .then((data) => {
        setRanApiCall(true);
        setCurrentUser({ user: data.data[0], index: 0 });
        console.log('GET DISCOVER', data.data);
        setProfileArray(data.data);
      })
      .catch((err) => {
        console.log(err);
        setRanApiCall(true);
      });
  }, []);
  useEffect(() => {
    if (reRender) {
      setReRender(false);
    }
    console.log('PROFILE ARRAy', profileArray);
  }, [reRender]);

  return (
    <div className="h-[100vh] bg-hero">
      {ranApiCall && currentUser.user.userId !== 0 ? (
        <>
          {/* Title */}
          <div className="flex flex-row justify-center text-6xl text-[#494036]">
            <div>Discover Mode</div>
          </div>

          {/* <div className="flex items-center gap-2 overflow-x-auto">

          </div> */}

          {/* Carousel */}
          <div className="flex flex-col h-[90vh] justify-center items-center m-auto w-[100%]">
            {!reRender && (
              <Carousel
                leftArrow={
                  <i className={buttonClassNames + ' fa-arrow-left mr-[10px]'}></i>
                }
                rightArrow={
                  <i className={buttonClassNames + ' fa-arrow-right ml-[10px]'}></i>
                }
                show={3}
                slide={1}
                swiping={true}
                className="flex flex-row justify-evenly items-center max-w-[1000px] max-h-[80vh]"
                transition={0.5}
              >
                {/* Images */}
                {Array.isArray(currentUser.user.pictures) &&
                  currentUser.user.pictures.map((image, index) => (
                    <div
                      className="flex-col justify-center items-center"
                      key={index}
                    >
                      {/* Main Image */}
                      <img
                        src={image}
                        className={`h-[60vh] max-w-[333.33px] object-cover object-center rounded-lg`}
                        alt=""
                      />
                    </div>
                  ))}
              </Carousel>
            )}

            {/* Yes/No buttons */}
            <div className="flex flex-row justify-between w-[50%] mt-[-5vh] mb-[8vh] z-[10]">
              <div>
                <button onClick={handleBark} className={barkSniffClasses}>
                  Bark
                </button>
              </div>
              <div>
                <button onClick={handleSniff} className={barkSniffClasses}>
                  Sniff
                </button>
              </div>
            </div>

            {/* Profile info */}
            <ProfileInfo currentUser={currentUser} />
          </div>
        </>
      ) : ranApiCall === true ? (
        <>
          Please login <a href="/callback">here</a>
        </>
      ) : null}
    </div>
  );
};
// ) : ranApiCall === false ? (
//   <>Loading Discover Mode</>

export default Discovery;
