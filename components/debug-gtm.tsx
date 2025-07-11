/**
 * Debug component to check if GTM ID is loaded
 * Remove this component after confirming GTM works in production
 */
export function DebugGTM() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  
  // Only show in development or if specifically enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_DEBUG_GTM) {
    return null
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px', 
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>GTM ID: {gtmId || 'NOT SET'}</div>
      <div>Environment: {process.env.NODE_ENV}</div>
    </div>
  )
}
