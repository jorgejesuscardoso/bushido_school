import { useEffect, useState } from "react";
import { ImageFrame } from "./ImageFrame";
import { ImageMap } from "../../utils/Hooks";
import { BtnNext, BtnPrevious, DivDisplaySection, Frame, SlideGradeSection, SlideSection } from "./style";
import { ImageFrameProps } from "../../types/components";
import { ImageGrade } from "./ImageGrade";

export const ImageDisplay = () => {
  const [image, setImage] = useState({ id: 0 ,src: '', alt: '', title: '', description: ''});
  const [count, setCount] = useState(0);
  const [slidelength, setSlideLength] = useState(0);
  const [grade, setGrade] = useState<ImageFrameProps[]>();
  const [show, setShow] = useState('imgEnterPosition');

  useEffect(() => {
    const imageArray = ImageMap();

    setGrade(imageArray);

    setSlideLength(imageArray.length);
    
    const { id, src, alt, title, description } = imageArray[count];

    setImage({ id, src, alt, title, description });

  }, [count]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count + 1) % slidelength);
    }, 6250);
    const imgEnter = setTimeout(() => {
      setShow('imgEnterPosition');
    }, 0);
    const imgOut = setTimeout(() => {
      setShow('imgOutPosition');
    }, 5800);
    const toStart = setTimeout(() => {
      setShow('startPosition');
    }, 6200);

    return () => {
      clearInterval(interval),
      clearTimeout(imgOut);
      clearTimeout(toStart);
      clearTimeout(imgEnter);
    };
  }, [count, slidelength]);
  
  const handleNextImage = () => {
    setCount((count + 1) % slidelength);
  };
  const handlePreviousImage = () => {
    if (count === 0) {
      setCount(slidelength - 1);
      return;
    }
    setCount((count - 1) % slidelength);
  };
  return (
    <SlideSection>
      <Frame>
        <ImageFrame
          id={ image.id }
          src= { image.src }
          alt= { image.alt }
          title= { image.title }
          description= { image.description }
          slideLength= { slidelength }
          show= { show }
        />
        <BtnPrevious onClick={ handlePreviousImage }>
          <img src="prev.png" />
        </BtnPrevious>
        <BtnNext onClick={ handleNextImage }>
          <img src="next.png" alt="" />
        </BtnNext>
      </Frame>
      <SlideGradeSection>
        <h3>Novidades</h3>
        <DivDisplaySection>
          {grade && grade.map((item) => {
            return (
              <ImageGrade
                key= { item.id }
                id={ item.id }
                src= { item.src }
                alt= { item.alt }
                title= { item.title }
                description= { item.description }
                activeId={ image.id }
              />
            );
          })}
        </DivDisplaySection>
      </SlideGradeSection>
    </SlideSection>
  );
}