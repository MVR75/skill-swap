import React from 'react';
import style from './Skills.module.css';

interface SkillsProps {
    title: string,
    colorTag: string,
}

const Skills: React.FC<SkillsProps> = (props) => {
    return (
        <p className={style.tag} style={{'--tag-color': props.colorTag}as React.CSSProperties}>{props.title}</p>
    );
};

export default Skills;