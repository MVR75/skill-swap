import React from 'react';
import style from './Skills.module.css';

interface SkillsProps {
    title: string,
    colorTag: string,
}

const Skills: React.FC<SkillsProps> = (props) => {
    return (
        <p className={style[props.colorTag]}>{props.title}</p>
    );
};

export default Skills;