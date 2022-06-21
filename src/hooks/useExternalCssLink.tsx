import { useEffect, useState } from 'react'

export type Status = 'idle' | 'loading' | 'ready' | 'error'
export type LinkElement = HTMLLinkElement | null

function useExternalCssLnik(src: string): Status {
    const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle')

    useEffect(
        () => {
            if (!src) {
                setStatus('idle')
                return
            }

            // Fetch existing script element by src
            // It may have been added by another instance of this hook
            let link: LinkElement = document.querySelector(`link[href="${src}"]`)

            if (!link) {
                // Create script
                link = document.createElement('link')
                link.type = "text/css";
                link.href = src
                link.rel = "stylesheet";
                link.setAttribute('data-status', 'loading')
                // Add script to document body
                document.head.appendChild(link)

                // Store status in attribute on script
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event: Event) => {
                    link?.setAttribute(
                        'data-status',
                        event.type === 'load' ? 'ready' : 'error',
                    )
                }

                link.addEventListener('load', setAttributeFromEvent)
                link.addEventListener('error', setAttributeFromEvent)
            } else {
                // Grab existing script status from attribute and set to state.
                setStatus(link.getAttribute('data-status') as Status)
            }

            // Script event handler to update status in state
            // Note: Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event: Event) => {
                setStatus(event.type === 'load' ? 'ready' : 'error')
            }

            // Add event listeners
            link.addEventListener('load', setStateFromEvent)
            link.addEventListener('error', setStateFromEvent)

            // Remove event listeners on cleanup
            return () => {
                if (link) {
                    link.removeEventListener('load', setStateFromEvent)
                    link.removeEventListener('error', setStateFromEvent)
                }
            }
        },
        [src], // Only re-run effect if script src changes
    )

    return status
}

export default useExternalCssLnik;