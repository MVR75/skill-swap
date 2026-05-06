import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    title: string,
    type: 'submit' | 'button',
    bgColor: '#ABD27A' | 'transparent',
    onClick: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button 
        type={props.type} 
        className={styles.button} 
        style={{backgroundColor: props.bgColor}}
        onClick={props.onClick}>
            {props.title}
        </button>
    );
};

export default Button;