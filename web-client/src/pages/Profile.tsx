import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Description from '../components/profile/Description';
import EditForm from '../components/profile/EditForm';
import CarouselCard from '../components/profile/Carousel';

const Profile = ({ setUser, user }) => {
  const Auth0User = useAuth0().user;

  useEffect(() => {
    // setUser(user);
    if (user.userId === undefined && Auth0User && Auth0User.sub) {
      axios
        .get(`http://34.238.117.39:3000/users/${Auth0User.sub}`)
        .then((data) => {
          if (data.data._id === undefined) {
            return axios.post(
              `http://34.238.117.39:3000/users/${Auth0User.sub}`
            );
          } else {
            setUser(data.data);
            console.log('SET USER TO:', data.data);
          }
        })
        .then((data) => {
          if (data !== undefined) {
            setUser(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Auth0User]);

  const [title, setTitle] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [content, setContent] = useState('');

  const [all, setAll] = useState([
    {
      id: '1',
      title: 'About',
      age: '2',
      breed: 'corgi',
      content:
        'I am a very friendly and playful dog who loves strings very much!',
    },
  ]);

  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState('');
  const [isCreateNewDescription, setIsCreateNewDescription] = useState(false);

  const saveDescriptionContentToState = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const saveAgeContentToState = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAge(event.currentTarget.value);
  };

  const saveBreedContentToState = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBreed(event.currentTarget.value);
  };

  const toggleCreateNewDescription = () => {
    setIsCreateNewDescription(!isCreateNewDescription);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const editDescription = (id: string) => {
    setEditID(id);
    toggleEdit();
  };

  const updateDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const updatedDescription = all.map((each) => {
      if (each.id === editID) {
        return {
          ...each,
          title: title || each.title,
          content: content || each.content,
          age: age || each.age,
          breed: breed || each.breed,
        };
      }
      return each;
    });
    setAll(updatedDescription);
    toggleEdit();
  };

  if (edit) {
    const description = all.find((description) => {
      return description.id === editID;
    });
    return (
      <>
        {description && (
          <EditForm
            content={description.content}
            age={description.age}
            breed={description.breed}
            updateDescription={updateDescription}
            saveDescriptionContentToState={saveDescriptionContentToState}
            saveAgeContentToState={saveAgeContentToState}
            saveBreedContentToState={saveBreedContentToState}
            toggleCreateNewDescription={toggleCreateNewDescription}
            toggleEdit={toggleEdit}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex justify-evenly bg-hero bg-cover h-[100vh] bg-[length:800px_95%]">
      <div className="float-left m-10 ml-36 p-5 max-w-sm border border-black rounded-lg shadow-md dark:border-black h-[60vh] grid grid-cols-1 gap-2 content-center">
        {/* Profile Pic */}
        <div className="relative w-48 h-48 ml-[23%]">
          <img
            className="absolute rounded-full border border-gray-300 shadow=sm"
            src="https://mymodernmet.com/wp/wp-content/uploads/2020/10/cooper-baby-corgi-dogs-8.jpg"
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
        {/* Profile Name */}
        <div className="p-5">
          <h5 className="ml-[45%] pt-4 text-2xl font-bold tracking-tight text-[#494036] dark:text-[#494036]">
            {user.name ? `${user.name}` : console.log(user)}
          </h5>
        </div>
        {/* Description */}
        <div className="mb-4 font-normal text-[#494036] dark:text-[#494036] text-center">
          {!all.length ? (
            <div>
              <li>There is no description yet.</li>
            </div>
          ) : (
            all.map((each) => (
              <Description
                id={each.id}
                key={each.id}
                age={each.age}
                breed={each.breed}
                content={each.content}
                editDescription={editDescription}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <CarouselCard />
      </div>
    </div>
  );
};

export default Profile;
