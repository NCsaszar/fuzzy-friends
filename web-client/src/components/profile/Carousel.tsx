import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';

const CarouselCard = () => {
  const images: { image: string; caption: string }[] = [
    {
      image:
        'https://mymodernmet.com/wp/wp-content/uploads/2020/10/cooper-baby-corgi-dogs-8.jpg',
      caption: '1',
    },
    {
      image:
        'https://paradepets.com/.image/t_share/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg',
      caption: '2',
    },
    {
      image:
        'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-2-150x150.jpg',
      caption: '3',
    },
    {
      image:
        'https://animalso.com/wp-content/uploads/2016/10/husky-corgi-mix-1.jpg',
      caption: '4',
    },
    {
      image:
        'https://media-be.chewy.com/wp-content/uploads/shutterstock_1180793386.jpg',
      caption: '5',
    },
  ];

  return (
    <div className="mt-10 float-right max-w-[750px] p-5 bg-transparent border border-gray rounded-lg shadow-md dark:bg-transparent dark:border-gray h-110 grid grid-cols-1 gap-2 content-center">
      <Carousel
        leftArrow={
          <i className="fa-solid rounded-full p-3 text-md text-white hover:cursor-pointer bg-[#494036] fa-arrow-left"></i>
        }
        rightArrow={
          <i className="fa-solid rounded-full p-3 text-md text-white hover:cursor-pointer bg-[#494036] fa-arrow-right"></i>
        }
        show={1}
        slide={1}
        swiping={true}
        className="justify-evenly items-center"
        transition={0.5}
      >
        {images.map((image, index) => (
          <div
            className="ml-12 flex-row justify-center items-center"
            key={index}
          >
            <img
              src={image.image}
              className="h-[50vh] max-w-[500px] object-cover object-center"
              alt=""
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselCard;
