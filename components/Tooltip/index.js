import { Tooltip as AriaTooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';

export const Tooltip = ({ children, content, ...props }) => {
  const tooltip = useTooltipState({ placement: 'bottom' });

  if (!content) return <span>{children}</span>;

  return (
    <>
      <TooltipAnchor
        state={tooltip}
        className="focus-visible:ariakit-outline aria-disabled:opacity-50"
        style={{ fontWeight: 'inherit' }}
        {...props}
      >
        {children}
      </TooltipAnchor>
      <AriaTooltip
        state={tooltip}
        className="max-w-md px-2 py-1 text-sm border border-gray-500 rounded bg-neutral-50 drop-shadow"
      >
        {content}
      </AriaTooltip>
    </>
  );
};
