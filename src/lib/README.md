# Using Authentication Token in API Calls

This project provides several ways to use the authentication token from the Redux store in API headers.

## 1. API Utility with Interceptors (Recommended)

The `src/lib/api.ts` file creates an axios instance that automatically includes the authentication token in all requests.

### Features:
- Automatically adds `Authorization: Bearer {token}` header to all requests
- Handles 401 errors (authentication failures)
- Base URL configuration
- Request/response interceptors

### Usage:
```typescript
import api from '../lib/api'

// The token is automatically added to headers
const response = await api.get('/notes')
const newNote = await api.post('/notes', { title: 'Test', content: 'Content' })
```

## 2. Redux Async Thunks with Authentication

The `notesSlice.ts` demonstrates how to use async thunks with automatic token inclusion.

### Features:
- Automatic token validation
- Error handling with `rejectWithValue`
- Loading states
- Automatic token inclusion via the API utility

### Usage:
```typescript
import { useDispatch, useSelector } from 'react-redux'
import { getNotes, createNote } from '../lib/redux/notesSlice'

const dispatch = useDispatch()
const { notes, isLoading } = useSelector(state => state.notesSlice)

// Fetch notes (token automatically included)
useEffect(() => {
    dispatch(getNotes())
}, [dispatch])

// Create note (token automatically included)
const handleCreate = async () => {
    await dispatch(createNote({ title: 'Test', content: 'Content' }))
}
```

## 3. Custom Hook for API Operations

The `useApi` hook provides a convenient way to make authenticated API calls from components.

### Features:
- Authentication state checking
- Convenient methods (get, post, put, delete)
- Automatic error handling for unauthenticated users

### Usage:
```typescript
import { useApi } from '../lib/hooks/useApi'

const MyComponent = () => {
    const { get, post, isAuthenticated } = useApi()

    const fetchData = async () => {
        try {
            const response = await get('/notes')
            console.log(response.data)
        } catch (error) {
            console.error('API call failed:', error)
        }
    }

    const createData = async () => {
        try {
            const response = await post('/notes', { title: 'New Note' })
            console.log('Created:', response.data)
        } catch (error) {
            console.error('Creation failed:', error)
        }
    }

    if (!isAuthenticated) {
        return <div>Please log in</div>
    }

    return (
        <div>
            <button onClick={fetchData}>Fetch Notes</button>
            <button onClick={createData}>Create Note</button>
        </div>
    )
}
```

## 4. Direct Token Access (Advanced)

You can also access the token directly from the Redux store for custom implementations:

```typescript
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'

const MyComponent = () => {
    const { Token } = useSelector((state: RootState) => state.authSlice)
    
    const makeCustomRequest = async () => {
        if (!Token) return
        
        const headers = {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json'
        }
        
        // Make your custom request
        const response = await fetch('/api/endpoint', {
            headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
}
```

## Token Storage

The authentication token is stored in:
- **Redux Store**: `state.authSlice.Token`
- **Cookies**: Using `js-cookie` for persistence
- **Automatic**: Token is automatically retrieved from cookies on app initialization

## Error Handling

The system automatically handles:
- Missing tokens (throws error)
- 401 responses (authentication failures)
- Network errors
- Invalid responses

## Best Practices

1. **Use the API utility** for most API calls - it handles authentication automatically
2. **Use async thunks** for Redux state management with API calls
3. **Use the useApi hook** for component-level API operations
4. **Always check authentication state** before making API calls
5. **Handle errors gracefully** with proper user feedback

## Example Component

See `src/_Components/NotesExample/NotesExample.tsx` for a complete example of using notes with authentication.
