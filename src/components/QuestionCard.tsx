import React, { useState } from 'react'
import { questionPropsType } from './../Types/quiztype'


const QuestionCard: React.FC<questionPropsType> = ({ question, options ,callback }) => {
    //console.log(question,opition);
let [ selectedAns, setSelectionAns] =  useState("");
const handleSelection = ( ev : any) => {
   // console.log(ev.target.value);
        setSelectionAns(ev.target.value);
}
    return (
        <div className='question-container'>
            <div className='question'>
                {question}
            </div>
            <form onSubmit = {(e:React.FormEvent<EventTarget>) =>callback(e,selectedAns)}>
                {
                    options.map((opt: string, ind: number) => {
                        return (
                            <div className="radio" key={ind}>
                                <label>
                                    <input
                                        type="radio"
                                        name="opt"
                                        required
                                        value={opt}
                                        checked = {selectedAns === opt}
                                        onChange = {handleSelection}
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                }
                <input className='btn' type='submit' />
            </form>

        </div>
    )
}

export default QuestionCard;
