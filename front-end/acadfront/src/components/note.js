/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";


const Aluno = ({studentId,FirstName,LastName,Matricula,Email,Curso,onclick}) =>{
return(
    <div className="note">
        <div className="note-header">
            <div>
                <p className="note-title">Aluno {studentId}</p>
            </div>
            <div>
                <a href="#" className="close" onClick={onclick}>X</a>
            </div>
        </div>
        <hr/>
        <br/>
        <br/>
        <div className="note-content">
            <p>{FirstName}</p>
            <p>{LastName}</p>
            <p>{Matricula}</p>
            <p>{Email}</p>
            <p>{Curso}</p>
        </div>
    </div>
)
}

export {Aluno}