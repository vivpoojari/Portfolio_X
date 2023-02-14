import PropTypes from 'prop-types'

export default function Square(props){
    let styles = {
        backgroundColor: props.on ? "white":"transparent" 
    }
    return (
        <div className="box" style = {styles} 
        onClick={ () => props.flip(props.id) } >

        </div>
    )
}

// Square.propTypes = {
//     id : PropTypes.number.isRequired
// }

// Square.defaultProps = {
//     on: false
// }

