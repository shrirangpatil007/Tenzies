export default function Die({value, isHeld, id, hold}) {
    return (
        <>
        <button className={isHeld ? "diceTrue-btn" : "diceFalse-btn"} onClick={hold}>{value}</button>
        
        </>
        
    )
}