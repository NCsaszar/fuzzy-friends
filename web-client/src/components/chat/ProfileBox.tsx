import React from 'react';

interface ProfileBoxProps {
  mate: Mate;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ mate }) => {
  return (
    <>
      <div className="m-10 p-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[80vh] grid grid-cols-1 gap-2 content-center">
        <div className="relative w-48 h-48 ml-16">
          <img
            className="absolute rounded-full border border-gray-300 shadow=sm"
            src={mate.pictures ? mate.pictures[0] : null}
            alt="profile photo"
          />
          <div className="w-48 h-48 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
            <img
              className="hidden group-hover:block w-12"
              src="https://www.svgrepo.com/show/33565/upload.svg"
              alt=""
            />
            <input className="opacity-0 absolute" type="file" id="formFile" />
          </div>
          <div className="absolute top-0 right-0 h-10 w-10 my-1 border-4 border-white rounded-full bg-green-400 z-2"></div>
        </div>
        <div className="p-5">
          <h5 className="mb-2 ml-28 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {mate.name}
          </h5>
        </div>
        <div className="mb-5 font-normal text-gray-700 dark:text-gray-400 text-center">
          <div className="content-center card card-width bg-dark">
            <section className="flex-row items-center">
              <h3 className="mb-5 text-l font-bold tracking-tight text-gray-700 dark:text-gray">
                Age: {mate.age}
              </h3>
              <h3 className="mb-5 text-l font-bold tracking-tight text-gray-700 dark:text-gray">
                Breed: {mate.breed}
              </h3>
              <h3 className="mb-5 text-l font-bold tracking-tight text-gray-700 dark:text-gray">
                Gender: {mate.gender}
              </h3>
            </section>
            <h2>{mate.description}</h2>
            <hr className="w-48 h-1 mx-auto my-1 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
            {/* <p>{content}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
