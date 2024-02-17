import { useEffect, useState } from "react";

export default function DiscussionTime(props) {
    const {
        setRoundStep
    } = props;

    const [countDown, setCountDown] = useState(60);

    useEffect(() => {
        countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
        0 == countDown && setRoundStep(4);
    }, [countDown, setRoundStep]);

    return (
        <>
            <p>Who chose this song?</p>
            <p>You have a minute to discuss</p>
            <p>Time left {countDown}</p>

            <button
                onClick={() => setRoundStep(4)}
            >
                Continue
            </button>
        </>
    )
  }
