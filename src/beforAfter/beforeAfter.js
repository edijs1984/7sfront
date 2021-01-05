import React from "react";
import Slider from "infinite-react-carousel";

const BeforeAfter = () => (
  <div className="bftop">
    <Slider dots slidesPerRow={2} centerMode={true} autoplay={true}>
      <div>
        <h3>
          <image
            style={{ width: 50, height: 50 }}
            source={{
              uri:
                "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwja6KLx-vbmAhVmwqYKHQ2CBWwQjRx6BAgBEAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFile%3AWappen_Uri_matt.svg&psig=AOvVaw14zNypADY8NoYnyXTPyos_&ust=1578674474752347"
            }}
          />
        </h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
    </Slider>
  </div>
);

export default BeforeAfter;
