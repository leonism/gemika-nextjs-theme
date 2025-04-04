// ... existing imports ...
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';

function SomeComponent() {
  useIsomorphicLayoutEffect(() => {
    // Your effect logic here
  }, []);

  return (
    // ... component JSX ...
  );
}

export default SomeComponent;