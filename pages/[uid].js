
export const UserIdPage = (props) => {
    return (
        <h1>{props.id}</h1>
    )
}
export default UserIdPage;

export const getServerSideProps = async (ctx) => {
    const { params } = ctx;
    const userId = params.uid
    return {
        props: {
            id: 'userId-' + userId,
        },
    };
}