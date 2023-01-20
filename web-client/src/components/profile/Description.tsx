import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  id: string;
  content: string;
  age: string;
  breed: string;
  editDescription: (id: string) => void;
}

const Description = ({ id, age, breed, content, editDescription }: Props) => {
  return (
    <>
      <div className="card card-width bg-dark">
        <section className="flex justify-center space-x-20">
          <h3 className="mb-2 text-l font-bold tracking-tight text-[#494036]">
            About
          </h3>
          <span
            className="inline-block hover:cursor-pointer"
            title="Edit Description"
            onClick={() => editDescription(id)}
          >
            <EditIcon />
          </span>
        </section>
        <hr className="w-48 h-1 mx-auto my-1 bg-#906129 border-0 rounded md:my-10 dark:bg-[#906129]"></hr>
        <p>Age: {age}</p>
        <p>Breed: {breed}</p>
        <p className="mt-5">{content}</p>
      </div>
    </>
  );
};

export default Description;
