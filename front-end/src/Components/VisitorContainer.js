const VisitorContainer = (props) => {
    return <div className="grid grid-cols-[fit-content(1000px)_auto] w-56 text-xs font-medium text-white rounded-lg bg-gray-700 overflow-hidden divide-y divide-gray-600 divide-x">
        {props.children}
    </div>
}

export default VisitorContainer
