import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import star from '../assets/star.png';
import FontPreview from '../components/FontPreview';
import FontLiveTest from '@/components/FontLiveTest';
import SupportedChars from '@/components/SupportedChars';
import axios from 'axios';

function FontPage() {
    const location = useLocation();
    const { Font } = location.state ? location.state : {};
    const [font, setFont] = useState(Font ? Font : null);
    const { id } = useParams();
    const url = `http://localhost:5001/api/v1/fonts/${id}`;

    console.log('id:',id, '\nFont:',Font);

    useEffect(() => {
      console.log('in Effect');
        if (!font && id) {
            axios.get(url)
                .then(res => {
                    setFont(res.data);
                })
                .catch(error => {
                    console.error('Error fetching font:', error);
                });
        }
    }, [id, font]);

    useEffect(()=>{
        console.log('Hi');
    })

    const [userRating, setUserRating] = useState(0);
    const [ratings, setRatings] = useState(font?.rating || []);

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        return (sum / ratings.length).toFixed(1);
    };

    const averageRating = calculateAverageRating(font?.rating || []);

    const handleRatingChange = (ratingGot) => {
        const updatedRatings = [...ratings, ratingGot];
        setRatings(updatedRatings);
        setUserRating(ratingGot);
    };

    const categoryList = font?.category ? font.category[0].split(',').map(category => category.trim()) : [];

    return (
        <div className="w-full max-w-5xl mx-auto border-x-2 border-gray-500/20 mt-16 mb-16 px-5">
            <h1 className="text-black font-bold font-monsterrat text-4xl">{font?.name}</h1>
            <p className="text-black font-normal font-monsterrat text-md mt-5">
                By{" "}
                <span className="text-black font-semibold font-monsterrat text-md ml-2">{font?.designer}</span>
            </p>
            <div className="w-full flex items-end gap-2">
                <p className="text-black font-normal font-monsterrat text-md mt-5">Category</p>
                <div className="flex">
                    {categoryList.length > 0 &&
                        categoryList.map((categoryName, index) => (
                            <span key={categoryName}>
                                <Link
                                    to={`/category/${categoryName}`}
                                    className="text-[#fc4f1a] font-semibold font-monsterrat hover:underline"
                                >
                                    {categoryName}
                                </Link>
                                {index < categoryList.length - 1 && <span>,&nbsp;</span>}
                            </span>
                        ))}
                </div>
            </div>

            <div className="flex items-center gap-5 mt-5">
                <p className='font-normal font-monsterrat'>Ratings</p>
                <p className="text-md font-bold font-monsterrat text-black">{averageRating} / 5</p>
                <img className="w-6 h-6" src={star} alt="" />
            </div>

            <div className="flex items-center mt-5 gap-3">
                <div className="rating">
                    {[5, 4, 3, 2, 1].map((starNumber) => (
                        <React.Fragment key={starNumber}>
                            <input
                                type="radio"
                                id={`star-${starNumber}`}
                                name="star-radio"
                                value={starNumber}
                                checked={userRating === starNumber}
                                onChange={() => handleRatingChange(starNumber)}
                            />
                            <label htmlFor={`star-${starNumber}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        pathLength="360"
                                        d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                    ></path>
                                </svg>
                            </label>
                        </React.Fragment>
                    ))}
                </div>

                <p className="text-black font-bold text-md">
                    {font?.ratings?.length}
                    <span className="text-black font-normal font-monsterrat text-md"> user ratings</span>
                </p>
            </div>

            <div className='w-full mt-10'>
                <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="">
                        <TabsTrigger className='font-monsterrat font-semibold' value="preview">Preview & Download</TabsTrigger>
                        <TabsTrigger className='font-monsterrat font-semibold' value="test">Live Test</TabsTrigger>
                        <TabsTrigger className='font-monsterrat font-semibold' value="glyphs">Supported Characters</TabsTrigger>
                        <TabsTrigger className='font-monsterrat font-semibold' value="about">About</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview">
                        <FontPreview font={font} />
                    </TabsContent>
                    <TabsContent value="test">
                        <FontLiveTest font={font} />
                    </TabsContent>
                    <TabsContent value="glyphs">
                        <SupportedChars font={font} />
                    </TabsContent>
                    <TabsContent value="about">
                        About
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default FontPage;
