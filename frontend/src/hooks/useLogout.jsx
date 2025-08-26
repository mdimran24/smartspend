import { useAuthContext } from './useAuthContext'
// import { useAppointmentsContext } from './useAppointmentsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    // const { dispatch: appointmentsDispatch } = useAppointmentsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout
        dispatch({type: 'LOGOUT'})
        // appointmentsDispatch({type: 'SET_APPOINTMENTS', payload: null})
    }

    return {logout}
}