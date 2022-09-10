type Props = {
    children?: React.ReactNode,
};

const Container = ({ children }: Props) => {
    return (
        <div className="container p-4">
            <div className="col-md-6 offset-md-3">
                {children}
            </div>
        </div>
    )
}

export default Container