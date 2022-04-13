import { useSpringCarousel } from "react-spring-carousel"
import { useEffect, useState } from "react";



const dataSlider = [
    {
        title: "New dashboard",
        description: "leverage our standard to international",
        image: "/images/auth/Money_motivation_Monochromatic.svg",
        link: ""
    },
    {
        title: "New look",
        description: "leverage our standard to international",
        image: "/images/auth/Finance_analytics _Monochromatic.svg",
        link: ""
    },
    {
        title: "New spirit",
        description: "leverage our standard to international",
        image: "/images/auth/Wallet_Monochromatic.svg",
        link: ""
    }
]

const Slider = () => {

    const [activeSlide,setActiveSlide] = useState(0)

    const {
        carouselFragment,
        slideToItem,
        slideToNextItem,
        slideToPrevItem,
        getIsActiveItem,
        getCurrentActiveItem
    } = useSpringCarousel({
        withLoop: true,
        items: dataSlider.map((item, id) => ({
            id,
            renderItem: (
                <div className="flex flex-col w-full items-center">
                    <img className="mb-4" src={item.image}/>
                    <p className="text-xs sm:text-base  font-bold">{item.title}</p>
                    <p className="text-xs sm:text-sm ">{item.description}</p>
                </div>
            ),
        }))

    });


    useEffect(() => {
        // console.log(activeSlide)
        // console.log(getCurrentActiveItem())
    }, [activeSlide])


    return (
        <div className="flex flex-col">
            <div className=" text-white overflow-hidden">
                {carouselFragment}
            </div>

            <div className="flex flex-row text-white justify-center gap-4 mt-4">
                <button onClick={()=>{
                    setActiveSlide(getCurrentActiveItem().index-1)
                    slideToPrevItem()}} className="hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex flex-row items-center gap-1">
                    {/* {thumbsFragment} */}
                    {dataSlider.map((item,id)=>{
                     if(getIsActiveItem(id))   
                        return <button key={id} onClick={()=>{
                            setActiveSlide(id);
                            slideToItem(id)
                        }} className="h-2 w-2 mx-1 rounded-full bg-white" />
                    else
                    return <button key={id} onClick={()=>{
                        setActiveSlide(id);
                        slideToItem(id)
                    }} className="h-2 w-2 mx-1 rounded-full bg-gray-400" />

                })}
                </div>
                <button onClick={()=>{
                    slideToNextItem()
                    setActiveSlide(getCurrentActiveItem().index+1)
                    
                    }} className="hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )

}

export const Login = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row h-screen min-h-screen ">
            <div className="basis-5/6 md:basis-2/3 lg:basis-1/2  bg-white">
                <div className="flex flex-col justify-between h-full md:h-full">
                    <div className="basis-5/6  flex flex-col items-center justify-center h-full">
                        <div className="w-full px-8 py-8  sm:px-4 sm:w-auto">
                            <div className="flex mb-16 items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up-right-square-fill text-blue-800" viewBox="0 0 16 16">
                                    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
                                </svg>
                                <h1 className="text-lg font-bold ">Payroll<span className="text-blue-800">Kita</span></h1>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-3xl">Login</h1>
                                <p className="text-base text-gray-500">Welcome back! please enter your details</p>
                                <form className="flex flex-col gap-2">
                                    <div className="form-control ">
                                        <label htmlFor="username" className="text-xs">Email</label>
                                        <input name="username" className="h-10 px-4 w-full rounded-md border border-gray-400 text-xs"  />
                                    </div>
                                    <div className="form-control ">
                                        <label htmlFor="password" className="text-xs">Password</label>
                                        <input name="password" className="h-10 px-4 w-full rounded-md border border-gray-400 text-xs" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="inline-flex items-center gap-2">
                                            <input name="savePassword" type="checkbox" className="h-10 px-4 rounded-md border border-gray-400 " />
                                            <label htmlFor="savePassword" className="text-xs">Save Password</label>
                                        </div>
                                        <a className="text-xs" href="#">Forgot Password</a>
                                    </div>
                                    <button className="h-10 bg-blue-800 hover:bg-blue-900 text-sm text-white w-full rounded-md ">Sign in</button>
                                    <div className="flex  justify-center text-xs mt-2">
                                        <p>Don't have an Account? <a className="font-bold text-blue-800 hover:text-blue-900" href="#">SignUp</a></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="basis-1/6 flex flex-col justify-end">
                        <p className="text-xs text-gray-400  mb-4 ml-4">by <a className="text-blue-800" href="https://ahisyam.com"> ahisyam</a> @ 2022 All right reserved</p>
                    </div>
                </div>
            </div>
            <div className="basis-1/6 md:basis-1/3 lg:basis-1/2 bg-blue-900">
                <div className="w-full h-full flex flex-col justify-center ">
                    <Slider />
                </div>

            </div>
        </div>
    )
}