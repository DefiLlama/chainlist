import { useEffect, useState } from "react";

export const useClipboard = (options) => {
	const [hasCopied, setHasCopied] = useState(false);

	const resetAfter = options && options.resetAfter || 1000;
	const onSuccess = options && options.onSuccess;
	const onError = options && options.onError;

	useEffect(() => {
		if (hasCopied && resetAfter) {
			const handler = setTimeout(() => {
				setHasCopied(false);
			}, resetAfter);

			return () => {
				clearTimeout(handler);
			};
		}
	}, [hasCopied, resetAfter]);

  return {
    hasCopied,
    onCopy: async (data) => {
			try {
				if (typeof data !== "string") {
					data = JSON.stringify(data);
				}

				await navigator.clipboard.writeText(data);

				setHasCopied(true);

				if (onSuccess) {
					onSuccess(data);
				}
			} catch {
				if (onError) {
					onError();
				}
			}
		},
  }
};
