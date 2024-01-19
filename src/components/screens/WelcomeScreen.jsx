
export default function WelcomeScreen(props) {
    const {
        changeScreen,
        currentScreen
    } = props;
    
    return (
        <>
            <h1>Welcome to All Ears ! </h1>

            <button onClick={() => changeScreen(currentScreen + 1)}>
                Start
            </button>
        </>
    )
}