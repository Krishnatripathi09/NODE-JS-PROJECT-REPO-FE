/* eslint-disable no-empty */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
    const {_id, firstName,lastName,photoUrl,gender} = user||{};
const dispatch = useDispatch();


    const handleSendRequest = async ({status,userId}) =>{
        try{
            const res = await axios.post(BASE_URL + "/request/send/"+status + "/" + userId,
                {},{withCredentials:true})
                dispatch(removeUserFromFeed(userId))
        }catch(err){

        }
    }


  return (
    <div className="card bg-base-200 w-96 shadow-xl">
    <figure>
      <img
      src={photoUrl}
        alt="photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName +" "+ lastName}</h2> 
       {gender && <p>{gender}</p>}
      <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>handleSendRequest({status:"ignored",userId:_id})}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleSendRequest({status:"interested",userId:_id})}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard;