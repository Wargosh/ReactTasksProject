type Props = {
    label?: string;
    name: string;
    placeholder?: string;
};

const Input = (props: Props) => {
    return (
        <div>
            {/* <label htmlFor={props.name}>{label}</label> */}
            <input type="text" className="form-control" {...props} />
        </div>
    )
}

export default Input