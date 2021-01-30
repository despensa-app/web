const Link = ({href, children, preClassIcon, btnColor, size}) => (
    <a href={href} className={`btn btn-${btnColor}${size ? ' btn-' + size : ''}`}>
        {preClassIcon && <i className={preClassIcon}/>} {children}
    </a>
);

export default Link;