import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; //navigation 대문자아니고 앞글자소문자여야함


function Product(){

    return(
        <main id="pro" className='myScroll'>
            <h1>PRODUCT</h1>
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
                
                <SwiperSlide><div className="inner"><div className="pic"><img src={process.env.PUBLIC_URL+'/img/p2.png'} alt="마스크팩" /></div></div>MASK PACK</SwiperSlide>
                <SwiperSlide><div className="inner"><div className="pic"><img src={process.env.PUBLIC_URL+'/img/p4.png'} alt="튜브형제품" /></div></div>CLEANSER</SwiperSlide>
                <SwiperSlide><div className="inner"><div className="pic"><img src={process.env.PUBLIC_URL+'/img/p1.png'} alt="세트상품" /></div></div>SET GOODS</SwiperSlide>
                
                
            </Swiper>
        </main>
    );
}

export default Product;