import { useEffect } from 'react'
import { UseWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

const Home = () => {
    //const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = UseWorkoutsContext()

    useEffect(()  => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok) {
                //setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home