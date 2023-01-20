import { CurrentUser } from '../../pages/Discover';

interface ProfileProps {
  currentUser: CurrentUser;
}

const ProfileInfo = ({ currentUser }: ProfileProps) => {
  return (
    <>
      <div className="flex flex-row justify-evenly text-5xl text-[#494036]">
        <div>{currentUser.user.name}, {currentUser.user.gender}</div>
      </div>
      <div className="flex flex-row justify-evenly text-2xl text-[#494036]">
        <div>{currentUser.user.city}</div>
      </div>
      <div className="flex flex-row justify-evenly text-2xl text-[#494036]">
        <div>{currentUser.user.breed}</div>
      </div>


    </>
  );
};

export default ProfileInfo;
