const Link = ({href, children, preClassIcon, btnColor, size, onClick}) => (
    <a href={href ? href : '/'}
       className={`btn btn-${btnColor}${size ? ' btn-' + size : ''}`}
       onClick={onClick}>
        {preClassIcon && <i className={preClassIcon}/>} {children}
    </a>
);

export default Link;