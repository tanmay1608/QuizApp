import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom"

const LeaderBoard = () => {
    const params=useParams();
    const leaderboardData=useLoaderData();
    const quizInfo=leaderboardData[1]?.value?.data;
    const leaderboardInfo=leaderboardData[0]?.value?.data;
    
    
    
  return (
    <div className="w-full h-screen flex justify-center mt-10"
    >
       {
        leaderboardInfo.length === 0 ? <div className="">
            <p className="text-2xl">No user has attempted this quiz yet. You can be the first to try it!</p>
        </div> :  <div
        

        className="w-1/2  shadow-2xl flex flex-col relative ">
        <p className="text-start p-5 pb-0 text-4xl font-bold">{quizInfo?.category}</p>
        <p className="text-xl p-5 pt-0">{" "}{quizInfo?.title}</p>
       
        <div>
            {
                leaderboardInfo.map((data)=> (
                    <div key={data.id} className="">
                    <div  className="flex justify-between m-2 p-2">
                        <p className="uppercase">{data.name}</p>
                        <p>{data.email}</p>
                        <p>{data.score}Pt.</p>
                       
                    </div>
                    <div className="flex justify-center">
                     <div className="w-[95%] border-t border-gray-300"></div>

                    </div>
                     </div>
                ))
            }
        </div>
        </div>
       }
      
    </div>
  )
}

export default LeaderBoard
