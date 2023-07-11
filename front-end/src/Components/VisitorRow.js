const VisitorRow = (props) => {
    return (
    <>
        <div className="w-full px-2 py-1 whitespace-nowrap">{props.prefix}</div>
        <div className="w-full px-2 py-1">{props.text}</div>
    </>
    )
}

export default VisitorRow