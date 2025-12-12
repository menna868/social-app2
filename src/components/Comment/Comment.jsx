import React from 'react'
import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from './../DeleteComment/DeleteComment';

export default function Comment({ comment }) {
  const { content, commentCreator, createdAt ,_id} = comment;

  return (
    <div className="w-full rounded-md border-2 border-slate-800 bg-slate-800 text-white my-2 p-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={commentCreator?.photo} className="size-8" alt="" />
          <p>{commentCreator?.name}</p>
        </div>
        <span className="text-slate-300 text-sm">{createdAt}</span>
      </div>
      <div className="flex justify-between items-center">
        {" "}
        <div className="p-2">{content}</div>
        <div className='flex items-center '>
          {commentCreator?._id === localStorage.getItem("userId") && (
            <UpdateComment commentId={_id} />
          )}
          {commentCreator?._id === localStorage.getItem("userId") && (
            <DeleteComment Id={_id} />
          )}
        </div>
     
      </div>
    </div>
  );
}
