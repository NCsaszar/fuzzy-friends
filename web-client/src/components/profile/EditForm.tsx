import React from 'react';
import Upload from './Upload';

interface Props {
  content: string;
  age: string;
  breed: string;
  saveDescriptionContentToState: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  saveAgeContentToState: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  saveBreedContentToState: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  updateDescription: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEdit: () => void;
}

const EditForm = ({
  age,
  breed,
  content,
  saveDescriptionContentToState,
  saveAgeContentToState,
  saveBreedContentToState,
  updateDescription,
  toggleEdit,
}: Props) => {
  return (
    <div className='bg-hero bg-cover h-[100vh] bg-[length:800px_95%] pt-[10px]'>
      <form className="m-10 ml-[40%] p-5 max-w-sm bg-transparent border border-gray-200 rounded-lg shadow-md dark:border-gray-700 h-110 grid grid-cols-1 gap-2 content-center mt-[10px]">
        <h2 className="mb-2 ml-28 text-2xl font-bold tracking-tight text-black ">
          Edit Profile
        </h2>
        <div>
          <label className="block mb-2 text-sm font-medium text-black ">
            Age
          </label>
          <textarea
            maxLength={150}
            id="age"
            className="bg-transparent border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={age}
            onChange={saveAgeContentToState}
            placeholder="age"
            required
          />
          <label className="block mb-2 text-sm font-medium text-black ">
            Breed
          </label>
          <textarea
            maxLength={150}
            id="breed"
            className="bg-transparent border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={breed}
            onChange={saveBreedContentToState}
            placeholder="breed"
            required
          />
          <label className="block mb-2 text-sm font-medium text-black ">
            Description
          </label>
          <textarea
            maxLength={150}
            id="description"
            className="bg-transparent border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={content}
            onChange={saveDescriptionContentToState}
            placeholder="description"
            required
          />
        </div>
        <div>
          {/* <Upload /> */}
        </div>
        <button
          title="update changes"
          className="bg-transparent hover:bg-[#494036] text-[#494036] font-semibold hover:text-white py-2 px-4 border border-[#494036] hover:border-transparent rounded"
          onClick={updateDescription}
        >
          Update Description
        </button>
        <button
          className="bg-transparent hover:bg-[#494036] text-[#494036] font-semibold hover:text-white py-2 px-4 border border-[#494036] hover:border-transparent rounded"
          onClick={toggleEdit}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
