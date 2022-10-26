import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; //navigation 대문자아니고 앞글자소문자여야함


function Vids(){

    return(
        <main id="vids" className='myScroll'>
            <Swiper
            modules={[Pagination,Navigation]}
            pagination={{
                clickable: true,
            }}
            spaceBetween={60} //슬라이더간격
            navigation={true}
            loop = {true}
            slidesPerView={3}  //몇페이지 보일건지?
            centeredSlides={true}
            >
                
                <SwiperSlide><div className="inner">1</div></SwiperSlide>
                <SwiperSlide><div className="inner">2</div></SwiperSlide>
                <SwiperSlide><div className="inner">3</div></SwiperSlide>
                <SwiperSlide><div className="inner">4</div></SwiperSlide>
                <SwiperSlide><div className="inner">5</div></SwiperSlide>
            </Swiper>
        </main>
    );
}

export default Vids;