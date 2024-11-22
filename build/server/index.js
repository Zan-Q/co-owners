var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, createCookieSessionStorage, redirect as redirect$1 } from "@remix-run/node";
import { RemixServer, useFormAction, useNavigation, useRouteError, useParams, isRouteErrorResponse, useRouteLoaderData, useRevalidator, redirect, useFetcher, useFetchers, useLoaderData, useMatches, Link, Outlet, useSubmit, Form, Meta, Links, ScrollRestoration, Scripts, useLocation, useActionData, useSearchParams, useNavigate as useNavigate$1 } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import chalk from "chalk";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { z } from "zod";
import * as React from "react";
import { useState, useRef, useEffect, useId, useCallback } from "react";
import { getInstanceInfo } from "litefs-js";
import { HoneypotProvider, HoneypotInputs } from "remix-utils/honeypot/react";
import { clsx } from "clsx";
import { useSpinDelay } from "spin-delay";
import { extendTailwindMerge } from "tailwind-merge";
import { toast, Toaster } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useForm, getFormProps, useInputControl, getInputProps } from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { invariant, invariantResponse } from "@epic-web/invariant";
import { ServerOnly } from "remix-utils/server-only";
import { getHintUtils } from "@epic-web/client-hints";
import { clientHint, subscribeToSchemeChange } from "@epic-web/client-hints/color-scheme";
import { clientHint as clientHint$1 } from "@epic-web/client-hints/time-zone";
import * as cookie from "cookie";
import "bcryptjs";
import { Authenticator } from "remix-auth";
import { safeRedirect } from "remix-utils/safe-redirect";
import { createId } from "@paralleldrive/cuid2";
import { OIDCStrategy } from "web-oidc/remix";
import axios from "axios";
import { Honeypot, SpamError } from "remix-utils/honeypot/server";
import { useNavigate, useNavigationType, NavigationType } from "react-router-dom";
import { MantineProvider, TextInput, Textarea } from "@mantine/core";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { ensurePrimary } from "litefs-js/remix.js";
import { generateTOTP, getTOTPAuthUri } from "@epic-web/totp";
import * as E from "@react-email/components";
import { isMobile } from "react-device-detect";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip as Tooltip$1, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, IconButton, Typography } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { generateRobotsTxt, generateSitemap } from "@nasa-gcn/remix-seo";
import { Resend } from "resend";
import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";
import * as QRCode from "qrcode";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { toast as toast$1, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import RingLoader from "react-spinners/RingLoader.js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Storage } from "@google-cloud/storage";
import path from "path";
const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  DATABASE_PATH: z.string(),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
  INTERNAL_COMMAND_TOKEN: z.string(),
  HONEYPOT_SECRET: z.string(),
  CACHE_DATABASE_PATH: z.string(),
  // If you plan on using Sentry, uncomment this line
  // SENTRY_DSN: z.string(),
  // If you plan to use Resend, uncomment this line
  // RESEND_API_KEY: z.string(),
  // If you plan to use GitHub auth, remove the default:
  GITHUB_CLIENT_ID: z.string().default("MOCK_GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: z.string().default("MOCK_GITHUB_CLIENT_SECRET"),
  GITHUB_TOKEN: z.string().default("MOCK_GITHUB_TOKEN"),
  ALLOW_INDEXING: z.enum(["true", "false"]).optional()
});
function init() {
  const parsed = schema.safeParse(process.env);
  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }
}
function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    ALLOW_INDEXING: process.env.ALLOW_INDEXING
  };
}
const NonceContext = React.createContext("");
const NonceProvider = NonceContext.Provider;
const useNonce = () => React.useContext(NonceContext);
function makeTimings(type, desc) {
  const timings = {
    [type]: [{ desc, start: performance.now() }]
  };
  Object.defineProperty(timings, "toString", {
    value: function() {
      return getServerTimeHeader(timings);
    },
    enumerable: false
  });
  return timings;
}
function createTimer(type, desc) {
  const start = performance.now();
  return {
    end(timings) {
      let timingType = timings[type];
      if (!timingType) {
        timingType = timings[type] = [];
      }
      timingType.push({ desc, time: performance.now() - start });
    }
  };
}
async function time(fn, {
  type,
  desc,
  timings
}) {
  const timer = createTimer(type, desc);
  const promise = typeof fn === "function" ? fn() : fn;
  if (!timings) return promise;
  const result = await promise;
  timer.end(timings);
  return result;
}
function getServerTimeHeader(timings) {
  if (!timings) return "";
  return Object.entries(timings).map(([key2, timingInfos]) => {
    const dur = timingInfos.reduce((acc, timingInfo) => {
      const time2 = timingInfo.time ?? performance.now() - timingInfo.start;
      return acc + time2;
    }, 0).toFixed(1);
    const desc = timingInfos.map((t) => t.desc).filter(Boolean).join(" & ");
    return [
      key2.replaceAll(/(:| |@|=|;|,|\/|\\)/g, "_"),
      desc ? `desc=${JSON.stringify(desc)}` : null,
      `dur=${dur}`
    ].filter(Boolean).join(";");
  }).join(",");
}
const ABORT_DELAY = 5e3;
init();
global.ENV = getEnv();
async function handleRequest(...args) {
  var _a2;
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext
  ] = args;
  const { currentInstance, primaryInstance } = await getInstanceInfo();
  responseHeaders.set("fly-region", process.env.FLY_REGION ?? "unknown");
  responseHeaders.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");
  responseHeaders.set("fly-primary-instance", primaryInstance);
  responseHeaders.set("fly-instance", currentInstance);
  if (process.env.NODE_ENV === "production" && process.env.SENTRY_DSN) {
    responseHeaders.append("Document-Policy", "js-profiling");
  }
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  const nonce = ((_a2 = loadContext.cspNonce) == null ? void 0 : _a2.toString()) ?? "";
  return new Promise(async (resolve, reject) => {
    let didError = false;
    const timings = makeTimings("render", "renderToPipeableStream");
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(NonceProvider, { value: nonce, children: /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }) }),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.append("Server-Timing", timings.toString());
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: () => {
          didError = true;
        },
        nonce
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
async function handleDataRequest(response) {
  const { currentInstance, primaryInstance } = await getInstanceInfo();
  response.headers.set("fly-region", process.env.FLY_REGION ?? "unknown");
  response.headers.set("fly-app", process.env.FLY_APP_NAME ?? "unknown");
  response.headers.set("fly-primary-instance", primaryInstance);
  response.headers.set("fly-instance", currentInstance);
  return response;
}
function handleError(error, { request }) {
  if (request.signal.aborted) {
    return;
  }
  if (error instanceof Error) {
    console.error(chalk.red(error.stack));
    void Sentry.captureRemixServerException(
      error,
      "remix.server",
      request,
      true
    );
  } else {
    console.error(error);
    Sentry.captureException(error);
  }
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  handleDataRequest,
  handleError
}, Symbol.toStringTag, { value: "Module" }));
const appleTouchIconAssetUrl = "/assets/apple-touch-icon-Ds7s8IDz.png";
const faviconAssetUrl = "/assets/favicon-Xd7rFGOf.svg";
const extendedTheme = {
  colors: {
    border: "hsl(var(--border))",
    input: {
      DEFAULT: "hsl(var(--input))",
      invalid: "hsl(var(--input-invalid))"
    },
    ring: {
      DEFAULT: "hsl(var(--ring))",
      invalid: "hsl(var(--foreground-destructive))"
    },
    background: "hsl(var(--background))",
    foreground: {
      DEFAULT: "hsl(var(--foreground))",
      destructive: "hsl(var(--foreground-destructive))"
    },
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))"
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))"
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))"
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))"
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))"
    },
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))"
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))"
    }
  },
  borderColor: {
    DEFAULT: "hsl(var(--border))"
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)"
  },
  fontSize: {
    // 1rem = 16px
    /** 80px size / 84px high / bold */
    mega: ["5rem", { lineHeight: "5.25rem", fontWeight: "700" }],
    /** 56px size / 62px high / bold */
    h1: ["3.5rem", { lineHeight: "3.875rem", fontWeight: "700" }],
    /** 40px size / 48px high / bold */
    h2: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
    /** 32px size / 36px high / bold */
    h3: ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }],
    /** 28px size / 36px high / bold */
    h4: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],
    /** 24px size / 32px high / bold */
    h5: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
    /** 16px size / 20px high / bold */
    h6: ["1rem", { lineHeight: "1.25rem", fontWeight: "700" }],
    /** 32px size / 36px high / normal */
    "body-2xl": ["2rem", { lineHeight: "2.25rem" }],
    /** 28px size / 36px high / normal */
    "body-xl": ["1.75rem", { lineHeight: "2.25rem" }],
    /** 24px size / 32px high / normal */
    "body-lg": ["1.5rem", { lineHeight: "2rem" }],
    /** 20px size / 28px high / normal */
    "body-md": ["1.25rem", { lineHeight: "1.75rem" }],
    /** 16px size / 20px high / normal */
    "body-sm": ["1rem", { lineHeight: "1.25rem" }],
    /** 14px size / 18px high / normal */
    "body-xs": ["0.875rem", { lineHeight: "1.125rem" }],
    /** 12px size / 16px high / normal */
    "body-2xs": ["0.75rem", { lineHeight: "1rem" }],
    /** 18px size / 24px high / semibold */
    caption: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
    /** 12px size / 16px high / bold */
    button: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }]
  },
  keyframes: {
    "caret-blink": {
      "0%,70%,100%": { opacity: "1" },
      "20%,50%": { opacity: "0" }
    }
  },
  animation: {
    "caret-blink": "caret-blink 1.25s ease-out infinite"
  }
};
function getUserImgSrc(imageUrl) {
  return imageUrl ? `${imageUrl}` : "/img/user.png";
}
function getErrorMessage(error) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  console.error("Unable to get error message for error", error);
  return "Unknown Error";
}
function formatColors() {
  const colors = [];
  for (const [key2, color] of Object.entries(extendedTheme.colors)) {
    if (typeof color === "string") {
      colors.push(key2);
    } else {
      const colorGroup = Object.keys(color).map(
        (subKey) => subKey === "DEFAULT" ? "" : subKey
      );
      colors.push({ [key2]: colorGroup });
    }
  }
  return colors;
}
const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: formatColors(),
      borderRadius: Object.keys(extendedTheme.borderRadius)
    },
    classGroups: {
      "font-size": [
        {
          text: Object.keys(extendedTheme.fontSize)
        }
      ]
    }
  }
});
function cn(...inputs) {
  return customTwMerge(clsx(inputs));
}
function getDomainUrl(request) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host") ?? new URL(request.url).host;
  const protocol = request.headers.get("X-Forwarded-Proto") ?? "http";
  return `${protocol}://${host}`;
}
function getReferrerRoute(request) {
  const referrer = request.headers.get("referer") ?? request.headers.get("referrer") ?? request.referrer;
  const domain = getDomainUrl(request);
  if (referrer == null ? void 0 : referrer.startsWith(domain)) {
    return referrer.slice(domain.length);
  } else {
    return "/";
  }
}
function combineHeaders(...headers2) {
  const combined = new Headers();
  for (const header of headers2) {
    if (!header) continue;
    for (const [key2, value] of new Headers(header).entries()) {
      combined.append(key2, value);
    }
  }
  return combined;
}
function combineResponseInits(...responseInits) {
  let combined = {};
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit == null ? void 0 : responseInit.headers)
    };
  }
  return combined;
}
function useIsPending({
  formAction,
  formMethod = "POST",
  state = "non-idle"
} = {}) {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();
  const isPendingState = state === "non-idle" ? navigation.state !== "idle" : navigation.state === state;
  return isPendingState && navigation.formAction === (formAction ?? contextualFormAction) && navigation.formMethod === formMethod;
}
function callAll(...fns) {
  return (...args) => fns.forEach((fn) => fn == null ? void 0 : fn(...args));
}
function useDoubleCheck() {
  const [doubleCheck, setDoubleCheck] = useState(false);
  function getButtonProps(props) {
    const onBlur = () => setDoubleCheck(false);
    const onClick = doubleCheck ? void 0 : (e) => {
      e.preventDefault();
      setDoubleCheck(true);
    };
    const onKeyUp = (e) => {
      if (e.key === "Escape") {
        setDoubleCheck(false);
      }
    };
    return {
      ...props,
      onBlur: callAll(onBlur, props == null ? void 0 : props.onBlur),
      onClick: callAll(onClick, props == null ? void 0 : props.onClick),
      onKeyUp: callAll(onKeyUp, props == null ? void 0 : props.onKeyUp)
    };
  }
  return { doubleCheck, getButtonProps };
}
function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => /* @__PURE__ */ jsxs("p", { children: [
    error.status,
    " ",
    error.data
  ] }),
  statusHandlers,
  unexpectedErrorHandler = (error) => /* @__PURE__ */ jsx("p", { children: getErrorMessage(error) })
}) {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  const params = useParams();
  if (typeof document !== "undefined") {
    console.error(error);
  }
  return /* @__PURE__ */ jsx("div", { className: "container flex items-center justify-center p-20 text-h2", children: isRouteErrorResponse(error) ? ((statusHandlers == null ? void 0 : statusHandlers[error.status]) ?? defaultStatusHandler)({
    error,
    params
  }) : unexpectedErrorHandler(error) });
}
const iconsHref = "/assets/sprite-DKOLMwy8.svg";
const sizeClassName = {
  font: "w-[1em] h-[1em]",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7"
};
const childrenSizeClassName = {
  font: "gap-1.5",
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  xl: "gap-3"
};
function Icon({
  name,
  size = "font",
  className,
  title,
  children,
  ...props
}) {
  if (children) {
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: `inline-flex items-center ${childrenSizeClassName[size]}`,
        children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              name,
              size,
              className,
              title,
              ...props
            }
          ),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      className: cn(sizeClassName[size], "inline self-center", className),
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsx("use", { href: `${iconsHref}#${name}` })
      ]
    }
  );
}
function EpicProgress() {
  const transition = useNavigation();
  const busy = transition.state !== "idle";
  const delayedPending = useSpinDelay(busy, {
    delay: 600,
    minDuration: 400
  });
  const ref = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    if (delayedPending) setAnimationComplete(false);
    const animationPromises = ref.current.getAnimations().map(({ finished }) => finished);
    void Promise.allSettled(animationPromises).then(() => {
      if (!delayedPending) setAnimationComplete(true);
    });
  }, [delayedPending]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "progressbar",
      "aria-hidden": delayedPending ? void 0 : true,
      "aria-valuetext": delayedPending ? "Loading" : void 0,
      className: "fixed inset-x-0 left-0 top-0 z-50 h-[0.20rem] animate-pulse",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            className: cn(
              "h-full w-0 bg-foreground duration-500 ease-in-out",
              transition.state === "idle" && (animationComplete ? "transition-none" : "w-full opacity-0 transition-all"),
              delayedPending && transition.state === "submitting" && "w-5/12",
              delayedPending && transition.state === "loading" && "w-8/12"
            )
          }
        ),
        delayedPending && /* @__PURE__ */ jsx("div", { className: "absolute flex items-center justify-center", children: /* @__PURE__ */ jsx(
          Icon,
          {
            name: "update",
            size: "md",
            className: "m-1 animate-spin text-foreground",
            "aria-hidden": true
          }
        ) })
      ]
    }
  );
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid md:text-sm md:file:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors outline-none focus-visible:ring-2 focus-within:ring-2 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        wide: "px-24 py-5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        pill: "px-12 py-3 leading-3",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const StatusButton = React.forwardRef(({ message, status, className, children, spinDelay, ...props }, ref) => {
  const delayedPending = useSpinDelay(status === "pending", {
    delay: 400,
    minDuration: 300,
    ...spinDelay
  });
  const companion = {
    pending: delayedPending ? /* @__PURE__ */ jsx(
      "div",
      {
        role: "status",
        className: "inline-flex h-6 w-6 items-center justify-center",
        children: /* @__PURE__ */ jsx(Icon, { name: "update", className: "animate-spin", title: "loading" })
      }
    ) : null,
    success: /* @__PURE__ */ jsx(
      "div",
      {
        role: "status",
        className: "inline-flex h-6 w-6 items-center justify-center",
        children: /* @__PURE__ */ jsx(Icon, { name: "check", title: "success" })
      }
    ),
    error: /* @__PURE__ */ jsx(
      "div",
      {
        role: "status",
        className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive",
        children: /* @__PURE__ */ jsx(
          Icon,
          {
            name: "cross-1",
            className: "text-destructive-foreground",
            title: "error"
          }
        )
      }
    ),
    idle: null
  }[status];
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      className: cn("flex justify-center gap-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { children }),
        message ? /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { children: companion }),
          /* @__PURE__ */ jsx(TooltipContent, { children: message })
        ] }) }) : companion
      ]
    }
  );
});
StatusButton.displayName = "Button";
function useToast(toast$12) {
  useEffect(() => {
    if (toast$12) {
      setTimeout(() => {
        toast[toast$12.type](toast$12.title, {
          id: toast$12.id,
          description: toast$12.description
        });
      }, 0);
    }
  }, [toast$12]);
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx("span", { className: "ml-auto h-4 w-4", children: "▶️" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx("span", { className: "h-4 w-4", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M1,4 L3,6 L7,2",
          stroke: "black",
          strokeWidth: "1",
          fill: "none"
        }
      ) }) }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx("span", { className: "h-2 w-2", children: "⚪" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const EpicToaster = ({ theme, ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function useRequestInfo() {
  const data = useRouteLoaderData("root");
  invariant(data == null ? void 0 : data.requestInfo, "No requestInfo found in root loader");
  return data.requestInfo;
}
const hintsUtils = getHintUtils({
  theme: clientHint,
  timeZone: clientHint$1
  // add other hints here
});
const { getHints } = hintsUtils;
function useHints() {
  const requestInfo = useRequestInfo();
  return requestInfo.hints;
}
function ClientHintCheck({ nonce }) {
  const { revalidate } = useRevalidator();
  React.useEffect(
    () => subscribeToSchemeChange(() => revalidate()),
    [revalidate]
  );
  return /* @__PURE__ */ jsx(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: hintsUtils.getClientHintCheckScript()
      }
    }
  );
}
const cookieName = "en_theme";
function getTheme(request) {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : "light";
  if (parsed === "light" || parsed === "dark") return parsed;
  return null;
}
function setTheme(theme) {
  if (theme === "system") {
    return cookie.serialize(cookieName, "", { path: "/", maxAge: -1 });
  } else {
    return cookie.serialize(cookieName, theme, { path: "/", maxAge: 31536e3 });
  }
}
const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
  // this is useful for progressive enhancement
  redirectTo: z.string().optional()
});
async function action$f({ request }) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema
  });
  invariantResponse(submission.status === "success", "Invalid theme received");
  const { theme, redirectTo } = submission.value;
  const responseInit = {
    headers: { "set-cookie": setTheme(theme) }
  };
  if (redirectTo) {
    return redirect(redirectTo, responseInit);
  } else {
    return json({ result: submission.reply() }, responseInit);
  }
}
function ThemeSwitch({
  userPreference
}) {
  var _a2;
  const fetcher = useFetcher();
  const requestInfo = useRequestInfo();
  const [form] = useForm({
    id: "theme-switch",
    lastResult: (_a2 = fetcher.data) == null ? void 0 : _a2.result
  });
  const optimisticMode = useOptimisticThemeMode();
  const mode2 = optimisticMode ?? userPreference ?? "system";
  const nextMode = mode2 === "system" ? "light" : mode2 === "light" ? "dark" : "system";
  const modeLabel = {
    light: /* @__PURE__ */ jsx(Icon, { name: "sun", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Light" }) }),
    dark: /* @__PURE__ */ jsx(Icon, { name: "moon", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Dark" }) }),
    system: /* @__PURE__ */ jsx(Icon, { name: "laptop", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "System" }) })
  };
  return /* @__PURE__ */ jsxs(
    fetcher.Form,
    {
      method: "POST",
      ...getFormProps(form),
      action: "/resources/theme-switch",
      children: [
        /* @__PURE__ */ jsx(ServerOnly, { children: () => /* @__PURE__ */ jsx("input", { type: "hidden", name: "redirectTo", value: requestInfo.path }) }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "theme", value: nextMode }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "flex h-8 w-8 cursor-pointer items-center justify-center",
            children: modeLabel[mode2]
          }
        ) })
      ]
    }
  );
}
function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find(
    (f) => f.formAction === "/resources/theme-switch"
  );
  if (themeFetcher && themeFetcher.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema
    });
    if (submission.status === "success") {
      return submission.value.theme;
    }
  }
}
function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeSwitch,
  action: action$f,
  useOptimisticThemeMode,
  useTheme
}, Symbol.toStringTag, { value: "Module" }));
const tailwindStyleSheetUrl = "/assets/tailwind-CEzgS5aj.css";
const toastKey = "toast";
const ToastSchema = z.object({
  description: z.string(),
  id: z.string().default(() => createId()),
  title: z.string().optional(),
  type: z.enum(["message", "success", "error"]).default("message")
});
const toastSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_toast",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production"
  }
});
async function redirectWithToast(url, toast2, init2) {
  return redirect$1(url, {
    ...init2,
    headers: combineHeaders(init2 == null ? void 0 : init2.headers, await createToastHeaders(toast2))
  });
}
async function createToastHeaders(toastInput) {
  const session = await toastSessionStorage.getSession();
  const toast2 = ToastSchema.parse(toastInput);
  session.flash(toastKey, toast2);
  const cookie2 = await toastSessionStorage.commitSession(session);
  return new Headers({ "set-cookie": cookie2 });
}
async function getToast(request) {
  const session = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const result = ToastSchema.safeParse(session.get(toastKey));
  const toast2 = result.success ? result.data : null;
  return {
    toast: toast2,
    headers: toast2 ? new Headers({
      "set-cookie": await toastSessionStorage.destroySession(session)
    }) : null
  };
}
const shouldMock = (_a = process.env.GOOGLE_CLIENT_ID) == null ? void 0 : _a.startsWith("MOCK_");
class GoogleProvider {
  getAuthStrategy() {
    return new OIDCStrategy(
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "https://co-owners.ca/auth/google/callback",
        authorizationParams: {
          scope: ["openid", "email"]
        },
        issuer: "https://accounts.google.com",
        response_type: "code"
      },
      async ({ profile }) => {
        if (!profile.email || !profile.email_verified) {
          throw redirectWithToast("/login", {
            title: "Cannot connect Google Account",
            description: "Your Google Email is Unverified",
            type: "error"
          });
        }
        return {
          email: profile.email,
          id: profile.sub,
          username: profile.preferred_username,
          name: profile.given_name,
          imageUrl: profile.picture
        };
      }
    );
  }
  async resolveConnectionData(providerId) {
    return { displayName: providerId, link: null };
  }
  // This is used to mock the Google OAuth flow in development.
  async handleMockAction(request) {
    if (!shouldMock) return;
    const connectionSession = await connectionSessionStorage.getSession(
      request.headers.get("cookie")
    );
    const state = createId();
    connectionSession.set("oidc:state", state);
    const code = "MOCK_CODE_GOOGLE_KODY";
    const searchParams = new URLSearchParams({ code, state });
    throw redirect$1(`/auth/google/callback?${searchParams}`, {
      headers: {
        "set-cookie": await connectionSessionStorage.commitSession(connectionSession)
      }
    });
  }
}
const connectionSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_connection",
    sameSite: "lax",
    // CSRF protection is advised if changing to 'none'
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    // 10 minutes
    secrets: process.env.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production"
  }
});
const providers = {
  google: new GoogleProvider()
  /*github: new GitHubProvider(),*/
};
function handleMockAction(providerName, request) {
  return providers[providerName].handleMockAction(request);
}
const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_session",
    sameSite: "lax",
    // CSRF protection is advised if changing to 'none'
    path: "/",
    httpOnly: true,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production"
  }
});
const originalCommitSession = authSessionStorage.commitSession;
Object.defineProperty(authSessionStorage, "commitSession", {
  value: async function commitSession(...args) {
    const [session, options2] = args;
    if (options2 == null ? void 0 : options2.expires) {
      session.set("expires", options2.expires);
    }
    if (options2 == null ? void 0 : options2.maxAge) {
      session.set("expires", new Date(Date.now() + options2.maxAge * 1e3));
    }
    const expires = session.has("expires") ? new Date(session.get("expires")) : void 0;
    const setCookieHeader = await originalCommitSession(session, {
      ...options2,
      expires
    });
    return setCookieHeader;
  }
});
const api = axios.create({
  withCredentials: true,
  //baseURL: "http://localhost:8000/v1/",
  baseURL: "https://prod.co-owners.ca:8000/v1/"
});
const errorHandler = (error) => {
  var _a2;
  (_a2 = error.response) == null ? void 0 : _a2.status;
  return Promise.reject(error);
};
api.interceptors.response.use(void 0, (error) => {
  return errorHandler(error);
});
const userAPI = {
  checkExistingEmail: async function(email) {
    const response = await api.request({
      url: `/auth/checkExistingUser`,
      method: "POST",
      data: {
        email
      }
    });
    return response.data;
  },
  login: async function(email, password) {
    try {
      const response = await api.request({
        url: `/auth/login`,
        method: "POST",
        data: {
          email,
          password
        }
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Login Failed", {
          description: "Invalid email or password"
        });
      }
    }
  },
  register: async function(username, name, email, password) {
    const response = await api.request({
      url: `/auth/register`,
      method: "POST",
      data: {
        username,
        name,
        email,
        password
      }
    });
    return response;
  },
  signUpWithGoogle: async function(email, username, name, providerId, providerName, imageUrl) {
    const response = await api.request({
      url: `/auth/signUpWithGoogle`,
      method: "POST",
      data: {
        email,
        username,
        name,
        providerId,
        providerName,
        imageUrl
      }
    });
    return response;
  },
  // Persistent Login - checking user token
  checklogintoken: async function(token) {
    try {
      const response = await api.request({
        url: `/auth/checklogintoken`,
        method: "POST",
        data: {
          token
        }
      });
      return response.data;
    } catch (error) {
    }
  },
  // User Login - via Google
  checkGoogleLogin: async function(email) {
    const response = await api.request({
      url: `/auth/check-login`,
      method: "POST",
      data: {
        email
      }
    });
    return response;
  },
  //Send Email Verification
  sendEmailVerification: async function(email, code, codeURL) {
    const response = await api.request({
      url: `/users/sendVerificationEmail`,
      method: "POST",
      data: {
        email,
        code,
        codeURL
      }
    });
    return response;
  },
  //Verify Email Code
  verifyEmailCode: async function(email, code) {
    try {
      const response = await api.request({
        url: `/users/confirmVerificationCode`,
        method: "POST",
        data: {
          email,
          code
        }
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Verification Failed", {
          description: "Invalid code"
        });
      }
    }
  },
  resetPassword: async function(token, password) {
    const response = await api.request({
      url: `/auth/reset-password`,
      method: "POST",
      params: {
        token
      },
      data: {
        password
      }
    });
    return response;
  },
  forgotPassword: async function(email) {
    const response = await api.request({
      url: `/auth/forgot-password`,
      method: "POST",
      data: {
        email
      }
    });
    return response;
  },
  updateProfile: async function(id, name, username, email) {
    const response = await api.request({
      url: `/auth/update-profile`,
      method: "POST",
      data: {
        userId: id,
        name,
        username,
        email
      }
    });
    return response;
  },
  updatePassword: async function(username, password) {
    const response = await api.request({
      url: `/auth/update-password`,
      method: "POST",
      data: {
        username,
        password
      }
    });
    return response;
  },
  getUserById: async function(id) {
    const response = await api.request({
      url: `/auth/getUserById`,
      method: "POST",
      data: {
        id
      }
    });
    return response;
  },
  getUserOwnedStocks: async function(sessionToken, businessId) {
    const response = await api.request({
      url: `/business/getUserOwnedStocks`,
      method: "POST",
      data: {
        sessionToken,
        businessId
      }
    });
    return response.data;
  },
  /**
   * Top Panel UI for User Dashboard
   * @param {*} sessionToken 
   * @returns 
   */
  getUserBalanceStocks: async function(sessionToken) {
    const response = await api.request({
      url: `/business/getUserBalancePorfolio`,
      method: "POST",
      data: {
        sessionToken
      }
    });
    return response.data;
  },
  /**
   * Middle Panel UI for Dashboard
   * @param {} sessionToken 
   * @returns 
   */
  getUserProfitValuation: async function(sessionToken) {
    const response = await api.request({
      url: `/business/getUserProfitValuation`,
      method: "POST",
      data: {
        sessionToken
      }
    });
    return response.data;
  },
  /**
   * Bottom Panel UI for Dashboard
   */
  getUserWatchList: async function(sessionToken) {
    try {
      const response = await api.request({
        url: `/users/getUserWatchlist`,
        method: "POST",
        data: {
          sessionToken
        }
      });
      return response.data;
    } catch (error) {
      toast.error("Authorization Error", {
        description: error.response.data.message
      });
    }
  }
};
const sessionKey = "sessionId";
const authenticator = new Authenticator(
  connectionSessionStorage
);
for (const [providerName, provider] of Object.entries(providers)) {
  authenticator.use(provider.getAuthStrategy(), providerName);
}
async function getUserId(request) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const sessionId = authSession.get(sessionKey);
  if (!sessionId) return null;
  const user2 = await userAPI.checklogintoken(sessionId);
  return user2;
}
async function requireUserId(request, { redirectTo } = {}) {
  const user2 = await getUserId(request);
  if (!user2) {
    const requestUrl = new URL(request.url);
    redirectTo = redirectTo === null ? null : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
    const loginRedirect = ["/login", loginParams == null ? void 0 : loginParams.toString()].filter(Boolean).join("?");
    throw redirect$1(loginRedirect);
  }
  return user2;
}
async function requireAnonymous(request) {
  const user2 = await getUserId(request);
  if (user2) {
    throw redirect$1("/");
  }
}
async function login({
  username,
  password
}) {
  const user2 = await userAPI.login(username, password);
  if (!user2) return null;
  return user2.data;
}
async function resetUserPassword({
  username,
  password
}) {
  return userAPI.updatePassword(username, password);
}
async function signup({
  email,
  username,
  password,
  name
}) {
  const data = userAPI.register(username, name, email, password);
  return data;
}
async function signupWithConnection({
  email,
  username,
  name,
  providerId,
  providerName,
  imageUrl
}) {
  const data = userAPI.signUpWithGoogle(email, username, name, providerId, providerName, imageUrl);
  return data;
}
async function logout({
  request,
  redirectTo = "/"
}, responseInit) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.get(sessionKey);
  return redirect$1(safeRedirect(redirectTo), {
    ...responseInit,
    headers: combineHeaders(
      { "set-cookie": await authSessionStorage.destroySession(authSession) },
      responseInit == null ? void 0 : responseInit.headers
    )
  });
}
const honeypot = new Honeypot({
  validFromFieldName: process.env.NODE_ENV === "test" ? null : void 0,
  encryptionSeed: process.env.HONEYPOT_SECRET
});
function checkHoneypot(formData) {
  try {
    honeypot.check(formData);
  } catch (error) {
    if (error instanceof SpamError) {
      throw new Response("Form not submitted properly", { status: 400 });
    }
    throw error;
  }
}
function isUser(user2) {
  return user2 && typeof user2 === "object" && typeof user2.id === "string";
}
function useOptionalUser() {
  const data = useRouteLoaderData("root");
  if (!data || !isUser(data.user)) {
    return void 0;
  }
  return data.user;
}
function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}
const links = () => {
  return [
    // Preload svg sprite as a resource to avoid render blocking
    { rel: "preload", href: iconsHref, as: "image" },
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "48x48"
    },
    { rel: "icon", type: "image/svg+xml", href: faviconAssetUrl },
    { rel: "apple-touch-icon", href: appleTouchIconAssetUrl },
    {
      rel: "manifest",
      href: "/site.webmanifest",
      crossOrigin: "use-credentials"
    },
    // necessary to make typescript happy
    { rel: "stylesheet", href: tailwindStyleSheetUrl }
  ].filter(Boolean);
};
const meta$9 = ({ data }) => {
  return [
    { title: data ? "Co Owners" : "Error | Co Owners" },
    { name: "description", content: `CommUnity Owners Platform` }
  ];
};
async function loader$u({ request }) {
  const timings = makeTimings("root loader");
  const user2 = await time(() => getUserId(request), {
    timings,
    type: "getUserId",
    desc: "getUserId in root"
  });
  if (!user2) {
    await logout({ request, redirectTo: "/" });
  }
  const { toast: toast2, headers: toastHeaders } = await getToast(request);
  const honeyProps = honeypot.getInputProps();
  return json(
    {
      user: user2,
      requestInfo: {
        hints: getHints(request),
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
        userPrefs: {
          theme: getTheme(request)
        }
      },
      ENV: getEnv(),
      toast: toast2,
      honeyProps
    },
    {
      headers: combineHeaders(
        { "Server-Timing": timings.toString() },
        toastHeaders
      )
    }
  );
}
const headers = ({ loaderHeaders }) => {
  const headers2 = {
    "Server-Timing": loaderHeaders.get("Server-Timing") ?? ""
  };
  return headers2;
};
function Document({
  children,
  nonce,
  theme = "light",
  env = {},
  allowIndexing = true
}) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: `${theme} h-full overflow-x-hidden`, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(ClientHintCheck, { nonce }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      allowIndexing ? null : /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "bg-background text-foreground", children: [
      children,
      /* @__PURE__ */ jsx(
        "script",
        {
          nonce,
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify(env)}`
          }
        }
      ),
      /* @__PURE__ */ jsx(ScrollRestoration, { nonce }),
      /* @__PURE__ */ jsx(Scripts, { nonce })
    ] })
  ] });
}
function App() {
  const data = useLoaderData();
  const nonce = useNonce();
  const user2 = useOptionalUser();
  const theme = useTheme();
  const matches = useMatches();
  matches.find((m) => m.id === "routes/users+/index");
  const allowIndexing = data.ENV.ALLOW_INDEXING !== "false";
  useToast(data.toast);
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  return /* @__PURE__ */ jsx(
    Document,
    {
      nonce,
      theme,
      allowIndexing,
      env: data.ENV,
      children: /* @__PURE__ */ jsxs(MantineProvider, { theme: { withGlobalStyles: true, withNormalizeCSS: true }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex h-screen flex-col justify-between", children: [
          /* @__PURE__ */ jsx("header", { className: "container py-6", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8", children: [
            /* @__PURE__ */ jsx(Logo, { navigationType, navigate, type: "header" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-10", children: user2 ? /* @__PURE__ */ jsx(UserDropdown, {}) : /* @__PURE__ */ jsx(Button, { asChild: true, variant: "default", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log In" }) }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
          /* @__PURE__ */ jsx("div", { className: "container pb-5 mt-5 w-full", children: /* @__PURE__ */ jsx(Logo, { navigationType, navigate, type: "footer" }) })
        ] }),
        /* @__PURE__ */ jsx(EpicToaster, { closeButton: true, position: "top-center", theme }),
        /* @__PURE__ */ jsx(EpicProgress, {})
      ] })
    }
  );
}
function Logo({ navigationType, navigate, type }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "group grid leading-snug", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/logo.png",
        alt: "Co-Owners",
        className: "h-10 w-auto group-hover:scale-150"
      }
    ) }),
    type === "header" && navigationType !== NavigationType.Pop && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => navigate == null ? void 0 : navigate(-1),
        className: "ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-5 w-5 mr-2",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 10H18a1 1 0 110 2H4.414l6.293 6.293A1 1 0 0110 18z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          "Go Back"
        ]
      }
    ),
    type === "footer" ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 w-full", children: [
      /* @__PURE__ */ jsxs("p", { className: "flex justify-center items-center text-sm w-1/4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Co-Owners"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center w-full", children: [
        /* @__PURE__ */ jsx("a", { href: "/privacy", className: "text-sm text-blue-500 hover:underline", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("a", { href: "/tos", className: "text-sm text-blue-500 hover:underline", children: "Terms of Service" }),
        /* @__PURE__ */ jsx("a", { href: "/about", className: "text-sm text-blue-500 hover:underline", children: "Contact Us" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 ml-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 hover:underline", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z" }) }) }),
        /* @__PURE__ */ jsx("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 hover:underline", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.043.76.127 1.122-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.555-.246-2.213-.614v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.318-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637.961-.694 1.797-1.562 2.457-2.549z" }) }) }),
        /* @__PURE__ */ jsx("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "text-blue-500 hover:underline", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M22.23 0h-20.46c-.974 0-1.77.796-1.77 1.77v20.459c0 .974.796 1.771 1.77 1.771h20.459c.974 0 1.771-.797 1.771-1.771v-20.459c0-.974-.797-1.77-1.771-1.77zm-15.539 20.452h-3.077v-11.999h3.077v11.999zm-1.538-13.635c-.987 0-1.787-.8-1.787-1.787s.8-1.787 1.787-1.787 1.787.8 1.787 1.787-.8 1.787-1.787 1.787zm13.539 13.635h-3.077v-5.999c0-1.428-.027-3.267-1.992-3.267-1.993 0-2.298 1.558-2.298 3.167v6.099h-3.077v-11.999h2.954v1.637h.042c.411-.776 1.416-1.592 2.916-1.592 3.118 0 3.693 2.053 3.693 4.724v7.23z" }) }) })
      ] }) })
    ] }) : null
  ] });
}
function AppWithProviders() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(HoneypotProvider, { ...data.honeyProps, children: /* @__PURE__ */ jsx(App, {}) });
}
const root = withSentry(AppWithProviders);
function UserDropdown() {
  const user2 = useUser();
  const submit = useSubmit();
  const formRef = useRef(null);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/user`,
        onClick: (e) => e.preventDefault(),
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "h-8 w-8 rounded-full object-cover",
              alt: user2.name ?? user2.username,
              src: getUserImgSrc(user2.imageUrl)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-body-sm font-bold", children: user2.name ?? user2.username })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(DropdownMenuPortal, { children: /* @__PURE__ */ jsxs(DropdownMenuContent, { sideOffset: 8, align: "start", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: `/user`, children: /* @__PURE__ */ jsx(Icon, { className: "text-body-md", name: "avatar", children: "Profile" }) }) }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { prefetch: "intent", to: `/dashboard`, children: /* @__PURE__ */ jsx(Icon, { className: "text-body-md", name: "envelope-closed", children: "Dashboard" }) }) }),
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          asChild: true,
          onSelect: (event) => {
            event.preventDefault();
            submit(formRef.current);
          },
          children: /* @__PURE__ */ jsx(Form, { action: "/logout", method: "POST", ref: formRef, children: /* @__PURE__ */ jsx(Icon, { className: "text-body-md", name: "exit", children: /* @__PURE__ */ jsx("button", { type: "submit", children: "Logout" }) }) })
        }
      )
    ] }) })
  ] });
}
function ErrorBoundary$7() {
  const nonce = useNonce();
  return /* @__PURE__ */ jsx(Document, { nonce, children: /* @__PURE__ */ jsx(GeneralErrorBoundary, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: root,
  headers,
  links,
  loader: loader$u,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
async function loader$t() {
  throw new Response("Not found", { status: 404 });
}
function NotFound() {
  return /* @__PURE__ */ jsx(ErrorBoundary$6, {});
}
function ErrorBoundary$6() {
  const location = useLocation();
  return /* @__PURE__ */ jsx(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx("h1", { children: "We can't find this page:" }),
            /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap break-all text-body-lg", children: location.pathname })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/", className: "text-body-md underline", children: /* @__PURE__ */ jsx(Icon, { name: "arrow-left", children: "Back to home" }) })
        ] })
      }
    }
  );
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$6,
  default: NotFound,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const GOOGLE_PROVIDER_NAME = "google";
const providerNames = [
  GOOGLE_PROVIDER_NAME
  /*GITHUB_PROVIDER_NAME,*/
];
const ProviderNameSchema = z.enum(providerNames);
const providerLabels = {
  [GOOGLE_PROVIDER_NAME]: "Google"
  /*[GITHUB_PROVIDER_NAME]: 'GitHub',*/
};
const providerIcons = {
  [GOOGLE_PROVIDER_NAME]: /* @__PURE__ */ jsx(Icon, { name: "google-logo" })
  /*[GITHUB_PROVIDER_NAME]: <Icon name="github-logo" />,*/
};
function ProviderConnectionForm({
  redirectTo,
  type,
  providerName
}) {
  const label = providerLabels[providerName];
  const formAction = `/auth/${providerName}`;
  const isPending = useIsPending({ formAction });
  return /* @__PURE__ */ jsxs(
    Form,
    {
      className: "flex items-center justify-center gap-2",
      action: formAction,
      method: "POST",
      children: [
        redirectTo ? /* @__PURE__ */ jsx("input", { type: "hidden", name: "redirectTo", value: redirectTo }) : null,
        /* @__PURE__ */ jsx(
          StatusButton,
          {
            type: "submit",
            className: "w-full",
            status: isPending ? "pending" : "idle",
            children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              providerIcons[providerName],
              /* @__PURE__ */ jsxs("span", { children: [
                type,
                " with ",
                label
              ] })
            ] })
          }
        )
      ]
    }
  );
}
const key = "redirectTo";
const destroyRedirectToHeader = cookie.serialize(key, "", { maxAge: -1 });
function getRedirectCookieHeader(redirectTo) {
  return redirectTo && redirectTo !== "/" ? cookie.serialize(key, redirectTo, { maxAge: 60 * 10 }) : null;
}
function getRedirectCookieValue(request) {
  const rawCookie = request.headers.get("cookie");
  const parsedCookies = rawCookie ? cookie.parse(rawCookie) : {};
  const redirectTo = parsedCookies[key];
  return redirectTo || null;
}
async function loader$s() {
  return redirect$1("/login");
}
async function action$e({ request, params }) {
  const providerName = ProviderNameSchema.parse(params.provider);
  try {
    await handleMockAction(providerName, request);
    return await authenticator.authenticate(providerName, request);
  } catch (error) {
    if (error instanceof Response) {
      const formData = await request.formData();
      const rawRedirectTo = formData.get("redirectTo");
      const redirectTo = typeof rawRedirectTo === "string" ? rawRedirectTo : getReferrerRoute(request);
      const redirectToCookie = getRedirectCookieHeader(redirectTo);
      if (redirectToCookie) {
        error.headers.append("set-cookie", redirectToCookie);
      }
    }
    throw error;
  }
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$e,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
const normalizeEmail = (s) => s.toLowerCase();
const normalizeUsername = (s) => s.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
const verifySessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_verification",
    sameSite: "lax",
    // CSRF protection is advised if changing to 'none'
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    // 10 minutes
    secrets: process.env.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production"
  }
});
const verifiedTimeKey = "verified-time";
const unverifiedSessionIdKey = "unverified-session-id";
const rememberKey = "remember";
async function handleNewSession({
  request,
  session,
  redirectTo,
  remember: remember2
}, responseInit) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.id);
  return redirect$1(
    safeRedirect(redirectTo),
    combineResponseInits(
      {
        headers: {
          "set-cookie": await authSessionStorage.commitSession(authSession, {
            expires: remember2 ? session.expirationDate : void 0
          })
        }
      },
      responseInit
    )
  );
}
async function handleVerification$3({
  request,
  submission
}) {
  invariant(
    submission.status === "success",
    "Submission should be successful by now"
  );
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  verifySession.get(rememberKey);
  const { redirectTo } = submission.value;
  const headers2 = new Headers();
  authSession.set(verifiedTimeKey, Date.now());
  headers2.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  );
  return redirect$1(safeRedirect(redirectTo), { headers: headers2 });
}
async function shouldRequestTwoFA(request) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  if (verifySession.has(unverifiedSessionIdKey)) return true;
  const user2 = await getUserId(request);
  if (!user2) return false;
  const verifiedTime = authSession.get(verifiedTimeKey) ?? /* @__PURE__ */ new Date(0);
  const twoHours = 1e3 * 60 * 2;
  return Date.now() - verifiedTime > twoHours;
}
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M1,4 L3,6 L7,2",
            stroke: "currentcolor",
            strokeWidth: "1",
            fill: "none"
          }
        ) })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx(
  OTPInput,
  {
    ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  }
));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  if (!slot) throw new Error("Invalid slot index");
  const { char, hasFakeCaret, isActive } = slot;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-base transition-all first:rounded-l-md first:border-l last:rounded-r-md md:text-sm",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "separator", ...props, children: "-" }));
InputOTPSeparator.displayName = "InputOTPSeparator";
function ErrorList({
  id,
  errors
}) {
  const errorsToRender = errors == null ? void 0 : errors.filter(Boolean);
  if (!(errorsToRender == null ? void 0 : errorsToRender.length)) return null;
  return /* @__PURE__ */ jsx("ul", { id, className: "flex flex-col gap-1", children: errorsToRender.map((e) => /* @__PURE__ */ jsx("li", { className: "text-[10px] text-foreground-destructive", children: e }, e)) });
}
function Field({
  labelProps,
  inputProps,
  errors,
  className
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = (errors == null ? void 0 : errors.length) ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: id, ...labelProps }),
    /* @__PURE__ */ jsx(
      Input,
      {
        id,
        "aria-invalid": errorId ? true : void 0,
        "aria-describedby": errorId,
        ...inputProps
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsx(ErrorList, { id: errorId, errors }) : null })
  ] });
}
function OTPField({
  labelProps,
  inputProps,
  errors,
  className
}) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = (errors == null ? void 0 : errors.length) ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(Label, { htmlFor: id, ...labelProps }),
    /* @__PURE__ */ jsxs(
      InputOTP,
      {
        pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
        maxLength: 6,
        id,
        "aria-invalid": errorId ? true : void 0,
        "aria-describedby": errorId,
        ...inputProps,
        children: [
          /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 2 })
          ] }),
          /* @__PURE__ */ jsx(InputOTPSeparator, {}),
          /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
            /* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsx(ErrorList, { id: errorId, errors }) : null })
  ] });
}
function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className
}) {
  const { key: key2, defaultChecked, ...checkboxProps } = buttonProps;
  const fallbackId = useId();
  const checkedValue = buttonProps.value ?? "on";
  const input = useInputControl({
    key: key2,
    name: buttonProps.name,
    formId: buttonProps.form,
    initialValue: defaultChecked ? checkedValue : void 0
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = (errors == null ? void 0 : errors.length) ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          ...checkboxProps,
          id,
          "aria-invalid": errorId ? true : void 0,
          "aria-describedby": errorId,
          checked: input.value === checkedValue,
          onCheckedChange: (state) => {
            var _a2;
            input.change(state.valueOf() ? checkedValue : "");
            (_a2 = buttonProps.onCheckedChange) == null ? void 0 : _a2.call(buttonProps, state);
          },
          onFocus: (event) => {
            var _a2;
            input.focus();
            (_a2 = buttonProps.onFocus) == null ? void 0 : _a2.call(buttonProps, event);
          },
          onBlur: (event) => {
            var _a2;
            input.blur();
            (_a2 = buttonProps.onBlur) == null ? void 0 : _a2.call(buttonProps, event);
          },
          type: "button"
        }
      ),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: id,
          ...labelProps,
          className: "self-center text-body-xs text-muted-foreground"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsx(ErrorList, { id: errorId, errors }) : null })
  ] });
}
function Spacer({
  size
}) {
  const options2 = {
    "4xs": "h-4",
    "3xs": "h-8",
    "2xs": "h-12",
    xs: "h-16",
    sm: "h-20",
    md: "h-24",
    lg: "h-28",
    xl: "h-32",
    "2xl": "h-36",
    "3xl": "h-40",
    "4xl": "h-44"
  };
  const className = options2[size];
  return /* @__PURE__ */ jsx("div", { className });
}
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;
const UsernameSchema = z.string({ required_error: "Username is required" }).min(USERNAME_MIN_LENGTH, { message: "Username is too short" }).max(USERNAME_MAX_LENGTH, { message: "Username is too long" }).transform((value) => value.toLowerCase());
const PasswordSchema = z.string({ required_error: "Password is required" }).min(8, { message: "Password is too short" }).max(100, { message: "Password is too long" });
const NameSchema = z.string({ required_error: "Name is required" }).min(3, { message: "Name is too short" }).max(40, { message: "Name is too long" });
const EmailSchema = z.string({ required_error: "Email is required" }).email({ message: "Email is invalid" }).min(3, { message: "Email is too short" }).max(100, { message: "Email is too long" }).transform((value) => value.toLowerCase());
const PasswordAndConfirmPasswordSchema = z.object({ password: PasswordSchema, confirmPassword: PasswordSchema }).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      path: ["confirmPassword"],
      code: "custom",
      message: "The passwords must match"
    });
  }
});
const onboardingEmailSessionKey = "onboardingEmail";
const SignupFormSchema$1 = z.object({
  username: UsernameSchema,
  name: NameSchema,
  agreeToTermsOfServiceAndPrivacyPolicy: z.boolean({
    required_error: "You must agree to the terms of service and privacy policy"
  }),
  remember: z.boolean().optional(),
  redirectTo: z.string().optional()
}).and(PasswordAndConfirmPasswordSchema);
async function requireOnboardingEmail(request) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const email = verifySession.get(onboardingEmailSessionKey);
  if (typeof email !== "string" || !email) {
    throw redirect$1("/signup");
  }
  return email;
}
async function loader$r({ request }) {
  const email = await requireOnboardingEmail(request);
  return json({ email });
}
async function action$d({ request }) {
  const email = await requireOnboardingEmail(request);
  const formData = await request.formData();
  checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: (intent) => SignupFormSchema$1.superRefine(async (data, ctx) => {
    }).transform(async (data) => {
      if (intent !== null) return { ...data, session: null };
      const session2 = await signup({ ...data, email });
      return { ...data, session: session2 };
    }),
    async: true
  });
  if (submission.status !== "success" || !submission.value.session) {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { session, remember: remember2 } = submission.value;
  const redirectTo = "/dashboard";
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.data.token);
  const verifySession = await verifySessionStorage.getSession();
  const headers2 = new Headers();
  headers2.append(
    "set-cookie",
    await authSessionStorage.commitSession(authSession, {
      expires: remember2 ? session.expirationDate : void 0
    })
  );
  headers2.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  );
  return redirectWithToast(
    safeRedirect(redirectTo),
    { title: "Welcome", description: "Thanks for signing up!" },
    { headers: headers2 }
  );
}
const meta$8 = () => {
  return [{ title: "Setup Epic Notes Account" }];
};
function OnboardingRoute() {
  const data = useLoaderData();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [form, fields] = useForm({
    id: "onboarding-form",
    constraint: getZodConstraint(SignupFormSchema$1),
    defaultValue: { redirectTo },
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupFormSchema$1 });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsx("div", { className: "container flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-h1", children: [
        "Welcome aboard ",
        data.email,
        "!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md text-muted-foreground", children: "Please enter your details." })
    ] }),
    /* @__PURE__ */ jsx(Spacer, { size: "xs" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        method: "POST",
        className: "mx-auto min-w-full max-w-sm sm:min-w-[368px]",
        ...getFormProps(form),
        children: [
          /* @__PURE__ */ jsx(HoneypotInputs, {}),
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: { htmlFor: fields.username.id, children: "Username" },
              inputProps: {
                ...getInputProps(fields.username, { type: "text" }),
                autoComplete: "username",
                className: "lowercase"
              },
              errors: fields.username.errors
            }
          ),
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: { htmlFor: fields.name.id, children: "Name" },
              inputProps: {
                ...getInputProps(fields.name, { type: "text" }),
                autoComplete: "name"
              },
              errors: fields.name.errors
            }
          ),
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: { htmlFor: fields.password.id, children: "Password" },
              inputProps: {
                ...getInputProps(fields.password, { type: "password" }),
                autoComplete: "new-password"
              },
              errors: fields.password.errors
            }
          ),
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: {
                htmlFor: fields.confirmPassword.id,
                children: "Confirm Password"
              },
              inputProps: {
                ...getInputProps(fields.confirmPassword, { type: "password" }),
                autoComplete: "new-password"
              },
              errors: fields.confirmPassword.errors
            }
          ),
          /* @__PURE__ */ jsx(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                children: "Do you agree to our Terms of Service and Privacy Policy?"
              },
              buttonProps: getInputProps(
                fields.agreeToTermsOfServiceAndPrivacyPolicy,
                { type: "checkbox" }
              ),
              errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors
            }
          ),
          /* @__PURE__ */ jsx(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: getInputProps(fields.remember, { type: "checkbox" }),
              errors: fields.remember.errors
            }
          ),
          /* @__PURE__ */ jsx("input", { ...getInputProps(fields.redirectTo, { type: "hidden" }) }),
          /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-6", children: /* @__PURE__ */ jsx(
            StatusButton,
            {
              className: "w-full",
              status: isPending ? "pending" : form.status ?? "idle",
              type: "submit",
              disabled: isPending,
              children: "Create an account"
            }
          ) })
        ]
      }
    )
  ] }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$d,
  default: OnboardingRoute,
  loader: loader$r,
  meta: meta$8,
  onboardingEmailSessionKey
}, Symbol.toStringTag, { value: "Module" }));
const providerIdKey = "providerId";
const prefilledProfileKey = "prefilledProfile";
const SignupFormSchema = z.object({
  imageUrl: z.string().optional(),
  username: UsernameSchema,
  name: NameSchema,
  agreeToTermsOfServiceAndPrivacyPolicy: z.boolean({
    required_error: "You must agree to the terms of service and privacy policy"
  }),
  remember: z.boolean().optional(),
  redirectTo: z.string().optional()
});
async function requireData({
  request,
  params
}) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const email = verifySession.get(onboardingEmailSessionKey);
  const providerId = verifySession.get(providerIdKey);
  const result = z.object({
    email: z.string(),
    providerName: ProviderNameSchema,
    providerId: z.string()
  }).safeParse({ email, providerName: params.provider, providerId });
  if (result.success) {
    return result.data;
  } else {
    console.error(result.error);
    throw redirect$1("/signup");
  }
}
async function loader$q({ request, params }) {
  const { email } = await requireData({ request, params });
  const connectionSession = await connectionSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const prefilledProfile = verifySession.get(prefilledProfileKey);
  const formError = connectionSession.get(authenticator.sessionErrorKey);
  const hasError = typeof formError === "string";
  return json({
    email,
    status: "idle",
    submission: {
      status: hasError ? "error" : void 0,
      initialValue: prefilledProfile ?? {},
      error: { "": hasError ? [formError] : [] }
    }
  });
}
async function action$c({ request, params }) {
  const { email, providerId, providerName } = await requireData({
    request,
    params
  });
  const formData = await request.formData();
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const submission = await parseWithZod(formData, {
    schema: SignupFormSchema.superRefine(async (data, ctx) => {
      const { user: user2, token, expirationDate } = await userAPI.checkExistingEmail(email);
      if (user2) {
        ctx.addIssue({
          path: ["username"],
          code: z.ZodIssueCode.custom,
          message: "A user already exists with this username"
        });
        return;
      }
    }).transform(async (data) => {
      const session2 = await signupWithConnection({
        ...data,
        email,
        providerId,
        providerName
      });
      return { ...data, session: session2 };
    }),
    async: true
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { session, remember: remember2 } = submission.value;
  const redirectTo = "/dashboard";
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.data.token);
  const headers2 = new Headers();
  headers2.append(
    "set-cookie",
    await authSessionStorage.commitSession(authSession, {
      expires: remember2 ? session.data.expirationDate : void 0
    })
  );
  headers2.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  );
  console.log(authSession);
  return redirectWithToast(
    safeRedirect(redirectTo),
    { title: "Welcome", description: "Thanks for signing up!" },
    { headers: headers2 }
  );
}
const meta$7 = () => {
  return [{ title: "Setup CoOwners Account" }];
};
function OnboardingProviderRoute() {
  const data = useLoaderData();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [form, fields] = useForm({
    id: "onboarding-provider-form",
    constraint: getZodConstraint(SignupFormSchema),
    lastResult: (actionData == null ? void 0 : actionData.result) ?? data.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SignupFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsx("div", { className: "container flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-h1", children: [
        "Welcome aboard ",
        data.email,
        "!"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md text-muted-foreground", children: "Please enter your details." })
    ] }),
    /* @__PURE__ */ jsx(Spacer, { size: "xs" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        method: "POST",
        className: "mx-auto min-w-full max-w-sm sm:min-w-[368px]",
        ...getFormProps(form),
        children: [
          fields.imageUrl.initialValue ? /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: fields.imageUrl.initialValue,
                alt: "Profile",
                className: "h-24 w-24 rounded-full"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-body-sm text-muted-foreground", children: "Cannot be changed here, but you can change your photo later" }),
            /* @__PURE__ */ jsx("input", { ...getInputProps(fields.imageUrl, { type: "hidden" }) })
          ] }) : null,
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: { htmlFor: fields.username.id, children: "Username" },
              inputProps: {
                ...getInputProps(fields.username, { type: "text" }),
                autoComplete: "username",
                className: "lowercase"
              },
              errors: fields.username.errors
            }
          ),
          /* @__PURE__ */ jsx(
            Field,
            {
              labelProps: { htmlFor: fields.name.id, children: "Name" },
              inputProps: {
                ...getInputProps(fields.name, { type: "text" }),
                autoComplete: "name"
              },
              errors: fields.name.errors
            }
          ),
          /* @__PURE__ */ jsx(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                children: "Do you agree to our Terms of Service and Privacy Policy?"
              },
              buttonProps: getInputProps(
                fields.agreeToTermsOfServiceAndPrivacyPolicy,
                { type: "checkbox" }
              ),
              errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors
            }
          ),
          /* @__PURE__ */ jsx(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: getInputProps(fields.remember, { type: "checkbox" }),
              errors: fields.remember.errors
            }
          ),
          redirectTo ? /* @__PURE__ */ jsx("input", { type: "hidden", name: "redirectTo", value: redirectTo }) : null,
          /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-6", children: /* @__PURE__ */ jsx(
            StatusButton,
            {
              className: "w-full",
              status: isPending ? "pending" : form.status ?? "idle",
              type: "submit",
              disabled: isPending,
              children: "Create an account"
            }
          ) })
        ]
      }
    )
  ] }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  default: OnboardingProviderRoute,
  loader: loader$q,
  meta: meta$7,
  prefilledProfileKey,
  providerIdKey
}, Symbol.toStringTag, { value: "Module" }));
const destroyRedirectTo = { "set-cookie": destroyRedirectToHeader };
async function loader$p({ request, params }) {
  await ensurePrimary();
  const providerName = ProviderNameSchema.parse(params.provider);
  const redirectTo = getRedirectCookieValue(request);
  const label = providerLabels[providerName];
  const authResult = await authenticator.authenticate(providerName, request, { throwOnError: true }).then(
    (data) => ({ success: true, data }),
    (error) => ({ success: false, error })
  );
  if (!authResult.success) {
    console.error(authResult.error);
    throw await redirectWithToast(
      "/login",
      {
        title: "Auth Failed",
        description: `There was an error authenticating with ${label}.`,
        type: "error"
      },
      { headers: destroyRedirectTo }
    );
  }
  const { data: profile } = authResult;
  const { user: user2, token, expirationDate } = await userAPI.checkExistingEmail(profile.email);
  if (user2) {
    return makeSession(
      { request, userId: user2.id, token, expirationDate },
      {
        headers: await createToastHeaders({
          title: "Connected",
          description: `Your profile has successfully logged in.`
        })
      }
    );
  }
  const verifySession = await verifySessionStorage.getSession();
  verifySession.set(onboardingEmailSessionKey, profile.email);
  verifySession.set(prefilledProfileKey, {
    ...profile,
    email: normalizeEmail(profile.email),
    username: typeof profile.username === "string" ? normalizeUsername(profile.username) : void 0
  });
  verifySession.set(providerIdKey, profile.id);
  const onboardingRedirect = [
    `/onboarding/${providerName}`,
    redirectTo ? new URLSearchParams({ redirectTo }) : null
  ].filter(Boolean).join("?");
  return redirect$1(onboardingRedirect, {
    headers: combineHeaders(
      { "set-cookie": await verifySessionStorage.commitSession(verifySession) },
      destroyRedirectTo
    )
  });
}
async function makeSession({
  request,
  userId,
  token,
  expirationDate,
  redirectTo
}, responseInit) {
  redirectTo ?? (redirectTo = "/");
  const session = { id: token, expirationDate, userId };
  return handleNewSession(
    { request, session, redirectTo, remember: true },
    { headers: combineHeaders(responseInit == null ? void 0 : responseInit.headers, destroyRedirectTo) }
  );
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const handle$b = {
  breadcrumb: /* @__PURE__ */ jsx(Icon, { name: "envelope-closed", children: "Change Email" }),
  getSitemapEntries: () => null
};
const newEmailAddressSessionKey = "new-email-address";
const ChangeEmailSchema = z.object({
  email: EmailSchema
});
async function loader$o({ request }) {
  await requireRecentVerification(request);
  const user2 = await requireUserId(request);
  if (!user2) {
    const params = new URLSearchParams({ redirectTo: request.url });
    throw redirect$1(`/login?${params}`);
  }
  return json({ user: user2 });
}
async function action$b({ request }) {
  await requireUserId(request);
  await request.formData();
}
function ChangeEmailIndex() {
  const data = useLoaderData();
  const actionData = useActionData();
  const [form, fields] = useForm({
    id: "change-email-form",
    constraint: getZodConstraint(ChangeEmailSchema),
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ChangeEmailSchema });
    }
  });
  const isPending = useIsPending();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Change Email" }),
    /* @__PURE__ */ jsx("p", { children: "You will receive an email at the new email address to confirm." }),
    /* @__PURE__ */ jsxs("p", { children: [
      "An email notice will also be sent to your old address ",
      data.user.email,
      "."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-5 max-w-sm", children: /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), children: [
      /* @__PURE__ */ jsx(
        Field,
        {
          labelProps: { children: "New Email" },
          inputProps: {
            ...getInputProps(fields.email, { type: "email" }),
            autoComplete: "email"
          },
          errors: fields.email.errors
        }
      ),
      /* @__PURE__ */ jsx(ErrorList, { id: form.errorId, errors: form.errors }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        StatusButton,
        {
          status: isPending ? "pending" : form.status ?? "idle",
          children: "Send Confirmation"
        }
      ) })
    ] }) })
  ] });
}
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b,
  default: ChangeEmailIndex,
  handle: handle$b,
  loader: loader$o,
  newEmailAddressSessionKey
}, Symbol.toStringTag, { value: "Module" }));
async function handleVerification$2({
  request,
  submission
}) {
  await requireRecentVerification(request);
  invariant(
    submission.status === "success",
    "Submission should be successful by now"
  );
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const newEmail = verifySession.get(newEmailAddressSessionKey);
  if (!newEmail) {
    return json(
      {
        result: submission.reply({
          formErrors: [
            "You must submit the code on the same device that requested the email change."
          ]
        })
      },
      { status: 400 }
    );
  }
  return redirectWithToast(
    "/settings/profile",
    {
      title: "Email Changed",
      type: "success",
      description: `Your email has been changed to ${user.email}`
    },
    {
      headers: {
        "set-cookie": await verifySessionStorage.destroySession(verifySession)
      }
    }
  );
}
const handle$a = {
  breadcrumb: /* @__PURE__ */ jsx(Icon, { name: "lock-closed", children: "2FA" }),
  getSitemapEntries: () => null
};
const twoFAVerificationType = "2fa";
function TwoFactorRoute$2() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TwoFactorRoute$2,
  handle: handle$a,
  twoFAVerificationType
}, Symbol.toStringTag, { value: "Module" }));
async function handleVerification$1({ submission }) {
  invariant(
    submission.status === "success",
    "Submission should be successful by now"
  );
  const verifySession = await verifySessionStorage.getSession();
  verifySession.set(onboardingEmailSessionKey, submission.value.target);
  return redirect$1("/onboarding", {
    headers: {
      "set-cookie": await verifySessionStorage.commitSession(verifySession)
    }
  });
}
const handle$9 = {
  getSitemapEntries: () => null
};
const resetPasswordUsernameSessionKey = "resetPasswordUsername";
const ResetPasswordSchema = PasswordAndConfirmPasswordSchema;
async function requireResetPasswordUsername(request) {
  await requireAnonymous(request);
  const verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  );
  const resetPasswordUsername = verifySession.get(
    resetPasswordUsernameSessionKey
  );
  if (typeof resetPasswordUsername !== "string" || !resetPasswordUsername) {
    throw redirect$1("/login");
  }
  return resetPasswordUsername;
}
async function loader$n({ request }) {
  const resetPasswordUsername = await requireResetPasswordUsername(request);
  return json({ resetPasswordUsername });
}
async function action$a({ request }) {
  const resetPasswordUsername = await requireResetPasswordUsername(request);
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ResetPasswordSchema
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { password } = submission.value;
  await resetUserPassword({ username: resetPasswordUsername, password });
  const verifySession = await verifySessionStorage.getSession();
  return redirect$1("/login", {
    headers: {
      "set-cookie": await verifySessionStorage.destroySession(verifySession)
    }
  });
}
const meta$6 = () => {
  return [{ title: "Reset Password | Epic Notes" }];
};
function ResetPasswordPage() {
  const data = useLoaderData();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [form, fields] = useForm({
    id: "reset-password",
    constraint: getZodConstraint(ResetPasswordSchema),
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ResetPasswordSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxs("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Password Reset" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-body-md text-muted-foreground", children: [
        "Hi, ",
        data.resetPasswordUsername,
        ". No worries. It happens all the time."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-16 min-w-full max-w-sm sm:min-w-[368px]", children: /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), children: [
      /* @__PURE__ */ jsx(
        Field,
        {
          labelProps: {
            htmlFor: fields.password.id,
            children: "New Password"
          },
          inputProps: {
            ...getInputProps(fields.password, { type: "password" }),
            autoComplete: "new-password",
            autoFocus: true
          },
          errors: fields.password.errors
        }
      ),
      /* @__PURE__ */ jsx(
        Field,
        {
          labelProps: {
            htmlFor: fields.confirmPassword.id,
            children: "Confirm Password"
          },
          inputProps: {
            ...getInputProps(fields.confirmPassword, { type: "password" }),
            autoComplete: "new-password"
          },
          errors: fields.confirmPassword.errors
        }
      ),
      /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
      /* @__PURE__ */ jsx(
        StatusButton,
        {
          className: "w-full",
          status: isPending ? "pending" : form.status ?? "idle",
          type: "submit",
          disabled: isPending,
          children: "Reset password"
        }
      )
    ] }) })
  ] });
}
function ErrorBoundary$5() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {});
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$5,
  action: action$a,
  default: ResetPasswordPage,
  handle: handle$9,
  loader: loader$n,
  meta: meta$6,
  resetPasswordUsernameSessionKey
}, Symbol.toStringTag, { value: "Module" }));
async function handleVerification({ submission }) {
  invariant(
    submission.status === "success",
    "Submission should be successful by now"
  );
  const target = submission.value.target;
  const { user: user2, token, expirationDate } = await userAPI.checkExistingEmail(target);
  if (!user2) {
    return json(
      { result: submission.reply({ fieldErrors: { code: ["Invalid code"] } }) },
      { status: 400 }
    );
  }
  const verifySession = await verifySessionStorage.getSession();
  verifySession.set(resetPasswordUsernameSessionKey, user2.username);
  return redirect$1("/reset-password", {
    headers: {
      "set-cookie": await verifySessionStorage.commitSession(verifySession)
    }
  });
}
const handle$8 = {
  getSitemapEntries: () => null
};
const codeQueryParam = "code";
const targetQueryParam = "target";
const typeQueryParam = "type";
const redirectToQueryParam = "redirectTo";
const types = ["onboarding", "reset-password", "change-email", "2fa"];
const VerificationTypeSchema = z.enum(types);
const VerifySchema$1 = z.object({
  [codeQueryParam]: z.string().min(6).max(6),
  [typeQueryParam]: VerificationTypeSchema,
  [targetQueryParam]: z.string(),
  [redirectToQueryParam]: z.string().optional()
});
async function action$9({ request }) {
  const formData = await request.formData();
  checkHoneypot(formData);
  return validateRequest(request, formData);
}
function VerifyRoute() {
  const [searchParams] = useSearchParams();
  const isPending = useIsPending();
  const actionData = useActionData();
  const parseWithZoddType = VerificationTypeSchema.safeParse(
    searchParams.get(typeQueryParam)
  );
  const type = parseWithZoddType.success ? parseWithZoddType.data : null;
  const checkEmail = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Check your email" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-body-md text-muted-foreground", children: "We've sent you a code to verify your email address." })
  ] });
  const headings = {
    onboarding: checkEmail,
    "reset-password": checkEmail,
    "change-email": checkEmail,
    "2fa": /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Check your 2FA app" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your 2FA code to verify your identity." })
    ] })
  };
  const [form, fields] = useForm({
    id: "verify-form",
    constraint: getZodConstraint(VerifySchema$1),
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: VerifySchema$1 });
    },
    defaultValue: {
      code: searchParams.get(codeQueryParam),
      type,
      target: searchParams.get(targetQueryParam),
      redirectTo: searchParams.get(redirectToQueryParam)
    }
  });
  return /* @__PURE__ */ jsxs("main", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center", children: type ? headings[type] : "Invalid Verification Type" }),
    /* @__PURE__ */ jsx(Spacer, { size: "xs" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-72 max-w-full flex-col justify-center gap-1", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }) }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full gap-2", children: /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), className: "flex-1", children: [
        /* @__PURE__ */ jsx(HoneypotInputs, {}),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          OTPField,
          {
            labelProps: {
              htmlFor: fields[codeQueryParam].id,
              children: "Code"
            },
            inputProps: {
              ...getInputProps(fields[codeQueryParam], { type: "text" }),
              autoComplete: "one-time-code",
              autoFocus: true
            },
            errors: fields[codeQueryParam].errors
          }
        ) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...getInputProps(fields[typeQueryParam], { type: "hidden" })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...getInputProps(fields[targetQueryParam], { type: "hidden" })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...getInputProps(fields[redirectToQueryParam], {
              type: "hidden"
            })
          }
        ),
        /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : form.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Submit"
          }
        )
      ] }) })
    ] })
  ] });
}
function ErrorBoundary$4() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {});
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$4,
  VerifySchema: VerifySchema$1,
  action: action$9,
  codeQueryParam,
  default: VerifyRoute,
  handle: handle$8,
  redirectToQueryParam,
  targetQueryParam,
  typeQueryParam
}, Symbol.toStringTag, { value: "Module" }));
function getRedirectToUrl({
  request,
  type,
  target,
  redirectTo
}) {
  const redirectToUrl = new URL(`${getDomainUrl(request)}/verify`);
  redirectToUrl.searchParams.set(typeQueryParam, type);
  redirectToUrl.searchParams.set(targetQueryParam, target);
  if (redirectTo) {
    redirectToUrl.searchParams.set(redirectToQueryParam, redirectTo);
  }
  return redirectToUrl;
}
async function requireRecentVerification(request) {
  const user2 = await requireUserId(request);
  const shouldReverify = await shouldRequestTwoFA(request);
  if (shouldReverify) {
    const reqUrl = new URL(request.url);
    const redirectUrl = getRedirectToUrl({
      request,
      target: user2.id,
      type: twoFAVerificationType,
      redirectTo: reqUrl.pathname + reqUrl.search
    });
    throw await redirectWithToast(redirectUrl.toString(), {
      title: "Please Reverify",
      description: "Please reverify your account before proceeding"
    });
  }
}
async function prepareVerification({
  period,
  request,
  type,
  target
}) {
  const verifyUrl = getRedirectToUrl({ request, type, target });
  const redirectTo = new URL(verifyUrl.toString());
  const { otp, ...verificationConfig } = generateTOTP({
    algorithm: "SHA256",
    // Leaving off 0, O, and I on purpose to avoid confusing users.
    charSet: "ABCDEFGHJKLMNPQRSTUVWXYZ123456789",
    period
  });
  ({
    type,
    target,
    ...verificationConfig,
    expiresAt: new Date(Date.now() + verificationConfig.period * 1e3)
  });
  verifyUrl.searchParams.set(codeQueryParam, otp);
  return { otp, redirectTo, verifyUrl };
}
async function isCodeValid({
  code,
  type,
  target
}) {
  const result = await userAPI.verifyEmailCode(target, code);
  if (!result) return false;
  return true;
}
async function validateRequest(request, body) {
  const submission = await parseWithZod(body, {
    schema: VerifySchema$1.superRefine(async (data, ctx) => {
      const codeIsValid = await isCodeValid({
        code: data[codeQueryParam],
        type: data[typeQueryParam],
        target: data[targetQueryParam]
      });
      if (!codeIsValid) {
        ctx.addIssue({
          path: ["code"],
          code: z.ZodIssueCode.custom,
          message: `Invalid code`
        });
        return;
      }
    }),
    async: true
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { value: submissionValue } = submission;
  switch (submissionValue[typeQueryParam]) {
    case "reset-password": {
      return handleVerification({ request, body, submission });
    }
    case "onboarding": {
      return handleVerification$1({ request, body, submission });
    }
    case "change-email": {
      return handleVerification$2({ request, body, submission });
    }
    case "2fa": {
      return handleVerification$3({ request, body, submission });
    }
  }
}
const handle$7 = {
  getSitemapEntries: () => null
};
const ForgotPasswordSchema = z.object({
  usernameOrEmail: z.union([EmailSchema, UsernameSchema])
});
async function action$8({ request }) {
  const formData = await request.formData();
  checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: ForgotPasswordSchema.superRefine(async (data, ctx) => {
      const { user: user2, token, expirationDate } = await userAPI.checkExistingEmail(data.usernameOrEmail);
      if (!user2) {
        ctx.addIssue({
          path: ["usernameOrEmail"],
          code: z.ZodIssueCode.custom,
          message: "No user exists with this username or email"
        });
        return;
      }
    }),
    async: true
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { usernameOrEmail } = submission.value;
  const { verifyUrl, redirectTo, otp } = await prepareVerification({
    period: 10 * 60,
    request,
    type: "reset-password",
    target: usernameOrEmail
  });
  const response = await userAPI.sendEmailVerification(usernameOrEmail, otp, verifyUrl.toString());
  if (response.data.status === "success") {
    return redirect$1(redirectTo.toString());
  } else {
    return json(
      { result: submission.reply({ formErrors: [response.error.message] }) },
      { status: 500 }
    );
  }
}
const meta$5 = () => {
  return [{ title: "Password Recovery for Epic Notes" }];
};
function ForgotPasswordRoute() {
  var _a2;
  const forgotPassword = useFetcher();
  const [form, fields] = useForm({
    id: "forgot-password-form",
    constraint: getZodConstraint(ForgotPasswordSchema),
    lastResult: (_a2 = forgotPassword.data) == null ? void 0 : _a2.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ForgotPasswordSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsx("div", { className: "container pb-32 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Forgot Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-body-md text-muted-foreground", children: "No worries, we'll send you reset instructions." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-16 min-w-full max-w-sm sm:min-w-[368px]", children: [
      /* @__PURE__ */ jsxs(forgotPassword.Form, { method: "POST", ...getFormProps(form), children: [
        /* @__PURE__ */ jsx(HoneypotInputs, {}),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Field,
          {
            labelProps: {
              htmlFor: fields.usernameOrEmail.id,
              children: "Email"
            },
            inputProps: {
              autoFocus: true,
              ...getInputProps(fields.usernameOrEmail, { type: "text" })
            },
            errors: fields.usernameOrEmail.errors
          }
        ) }),
        /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            status: forgotPassword.state === "submitting" ? "pending" : form.status ?? "idle",
            type: "submit",
            disabled: forgotPassword.state !== "idle",
            children: "Recover password"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/login",
          className: "mt-11 text-center text-body-sm font-bold",
          children: "Back to Login"
        }
      )
    ] })
  ] }) });
}
function ErrorBoundary$3() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {});
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$3,
  action: action$8,
  default: ForgotPasswordRoute,
  handle: handle$7,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const handle$6 = {
  getSitemapEntries: () => null
};
const LoginFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
  redirectTo: z.string().optional(),
  remember: z.boolean().optional()
});
async function loader$m({ request }) {
  await requireAnonymous(request);
  return json({});
}
async function action$7({ request }) {
  await requireAnonymous(request);
  const formData = await request.formData();
  checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: (intent) => LoginFormSchema.transform(async (data, ctx) => {
      if (intent !== null) return { ...data, session: null };
      const session2 = await login(data);
      if (!session2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid username or password"
        });
        return z.NEVER;
      }
      return { ...data, session: session2 };
    }),
    async: true
  });
  if (submission.status !== "success" || !submission.value.session) {
    return json(
      { result: submission.reply({ hideFields: ["password"] }) },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { session, remember: remember2, redirectTo } = submission.value;
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.token);
  const verifySession = await verifySessionStorage.getSession();
  const headers2 = new Headers();
  headers2.append(
    "set-cookie",
    await authSessionStorage.commitSession(authSession, {
      expires: remember2 ? session.expirationDate : void 0
    })
  );
  headers2.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  );
  return redirectWithToast(
    safeRedirect(redirectTo),
    { title: "Welcome Back", description: "Lets get down to business!" },
    { headers: headers2 }
  );
}
function LoginPage() {
  const actionData = useActionData();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [form, fields] = useForm({
    id: "login-form",
    constraint: getZodConstraint(LoginFormSchema),
    defaultValue: { redirectTo },
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-h2", children: "Your empire awaits!" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-sm text-muted-foreground", children: "Log in to your account to continue building your monopoly" })
    ] }),
    /* @__PURE__ */ jsx(Spacer, { size: "xs" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-md px-8", children: [
      /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), children: [
        /* @__PURE__ */ jsx(HoneypotInputs, {}),
        /* @__PURE__ */ jsx(
          Field,
          {
            labelProps: { children: "Email" },
            inputProps: {
              ...getInputProps(fields.username, { type: "text" }),
              autoFocus: true,
              className: "lowercase",
              autoComplete: "username"
            },
            errors: fields.username.errors
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            labelProps: { children: "Password" },
            inputProps: {
              ...getInputProps(fields.password, {
                type: "password"
              }),
              autoComplete: "current-password"
            },
            errors: fields.password.errors
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: getInputProps(fields.remember, {
                type: "checkbox"
              }),
              errors: fields.remember.errors
            }
          ),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/forgot-password",
              className: "text-body-xs font-semibold",
              children: "Forgot password?"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...getInputProps(fields.redirectTo, { type: "hidden" })
          }
        ),
        /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-6 pt-3", children: /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : form.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Log in"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        ProviderConnectionForm,
        {
          type: "Login",
          providerName,
          redirectTo
        }
      ) }, providerName)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "New here?" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: redirectTo ? `/signup?${encodeURIComponent(redirectTo)}` : "/signup",
            children: "Create an account"
          }
        )
      ] })
    ] }) })
  ] }) });
}
const meta$4 = () => {
  return [{ title: "Login to Epic Notes" }];
};
function ErrorBoundary$2() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {});
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$2,
  action: action$7,
  default: LoginPage,
  handle: handle$6,
  loader: loader$m,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
async function loader$l() {
  return redirect$1("/");
}
async function action$6({ request }) {
  return logout({ request });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const handle$5 = {
  getSitemapEntries: () => null
};
const SignupSchema = z.object({
  email: EmailSchema
});
async function action$5({ request }) {
  const formData = await request.formData();
  checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: SignupSchema.superRefine(async (data, ctx) => {
      const { user: user2, token, expirationDate } = await userAPI.checkExistingEmail(data.email);
      if (user2) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "A user already exists with this email"
        });
        return;
      }
    }),
    async: true
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  const { email } = submission.value;
  const { verifyUrl, redirectTo, otp } = await prepareVerification({
    period: 10 * 60,
    request,
    type: "onboarding",
    target: email
  });
  const response = await userAPI.sendEmailVerification(email, otp, verifyUrl.toString());
  if (response.data.status === "success") {
    return redirect$1(redirectTo.toString());
  } else {
    return json(
      {
        result: submission.reply({ formErrors: [response.error.message] })
      },
      {
        status: 500
      }
    );
  }
}
function SignupEmail({
  onboardingUrl,
  otp
}) {
  return /* @__PURE__ */ jsx(E.Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ jsxs(E.Container, { children: [
    /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx(E.Text, { children: "Welcome to Epic Notes!" }) }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs(E.Text, { children: [
      "Here's your verification code: ",
      /* @__PURE__ */ jsx("strong", { children: otp })
    ] }) }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(E.Text, { children: "Or click the link to get started:" }) }),
    /* @__PURE__ */ jsx(E.Link, { href: onboardingUrl, children: onboardingUrl })
  ] }) });
}
const meta$3 = () => {
  return [{ title: "Sign Up | Co Owners" }];
};
function SignupRoute() {
  const actionData = useActionData();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [form, fields] = useForm({
    id: "signup-form",
    constraint: getZodConstraint(SignupSchema),
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      const result = parseWithZod(formData, { schema: SignupSchema });
      return result;
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxs("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-h1", children: "Let's start building your empire!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your email." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-16 min-w-full max-w-sm sm:min-w-[368px]", children: [
      /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), children: [
        /* @__PURE__ */ jsx(HoneypotInputs, {}),
        /* @__PURE__ */ jsx(
          Field,
          {
            labelProps: {
              htmlFor: fields.email.id,
              children: "Email"
            },
            inputProps: {
              ...getInputProps(fields.email, { type: "email" }),
              autoFocus: true,
              autoComplete: "email"
            },
            errors: fields.email.errors
          }
        ),
        /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
        /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : form.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Submit"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        ProviderConnectionForm,
        {
          type: "Signup",
          providerName,
          redirectTo
        }
      ) }, providerName)) })
    ] })
  ] });
}
function ErrorBoundary$1() {
  return /* @__PURE__ */ jsx(GeneralErrorBoundary, {});
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  SignupEmail,
  action: action$5,
  default: SignupRoute,
  handle: handle$5,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const AboutSection = () => /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "About Community Owners" }),
  /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Welcome to Community Owners, an innovative real-life Monopoly-inspired game that transforms how we interact with and invest in our local communities. By bringing the basic mechanics of business share structures and the development of economic value into the real world, we create meaningful opportunities for community members to participate in local economic growth and neighborhood enhancement." }),
  /* @__PURE__ */ jsx("p", { className: "mb-4", children: "At Community Owners, we believe that thriving communities are built through active participation and strategic investment. Our platform enables players to purchase shares in local businesses – all while earning real returns on their investments." }),
  /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Our game mechanics go beyond traditional investment by incorporating community-focused challenges, collaborative development opportunities, and special events that encourage players to think both strategically and socially. Whether you're interested in business investment, community development, or simply want to make a positive impact in your neighborhood, Community Owners provides an engaging way to participate in local growth." }),
  /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Join us in this exciting venture where gaming meets community development, and every move you make contributes to building stronger, more vibrant neighborhoods. Together, we're not just playing a game – we're creating lasting positive change in our communities." }),
  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
    "For any questions or inquiries, please contact us at ",
    /* @__PURE__ */ jsx("a", { href: "mailto:ptang@co-owners.ca", className: "text-blue-500 hover:underline", children: "ptang@co-owners.ca" }),
    "."
  ] })
] });
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutSection
}, Symbol.toStringTag, { value: "Module" }));
const docker = "/assets/docker-CKYupBMy.svg";
const eslint = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2015.1.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20294.825%20258.982'%20xml:space='preserve'%3e%3cg%3e%3cpath%20fill='%238080F2'%20d='M97.021,99.016l48.432-27.962c1.212-0.7,2.706-0.7,3.918,0l48.433,27.962%20c1.211,0.7,1.959,1.993,1.959,3.393v55.924c0,1.399-0.748,2.693-1.959,3.394l-48.433,27.962c-1.212,0.7-2.706,0.7-3.918,0%20l-48.432-27.962c-1.212-0.7-1.959-1.994-1.959-3.394v-55.924C95.063,101.009,95.81,99.716,97.021,99.016'/%3e%3cpath%20fill='%234B32C3'%20d='M273.336,124.488L215.469,23.816c-2.102-3.64-5.985-6.325-10.188-6.325H89.545%20c-4.204,0-8.088,2.685-10.19,6.325l-57.867,100.45c-2.102,3.641-2.102,8.236,0,11.877l57.867,99.847%20c2.102,3.64,5.986,5.501,10.19,5.501h115.735c4.203,0,8.087-1.805,10.188-5.446l57.867-100.01%20C275.439,132.396,275.439,128.128,273.336,124.488%20M225.419,172.898c0,1.48-0.891,2.849-2.174,3.59l-73.71,42.527%20c-1.282,0.74-2.888,0.74-4.17,0l-73.767-42.527c-1.282-0.741-2.179-2.109-2.179-3.59V87.843c0-1.481,0.884-2.849,2.167-3.59%20l73.707-42.527c1.282-0.741,2.886-0.741,4.168,0l73.772,42.527c1.283,0.741,2.186,2.109,2.186,3.59V172.898z'/%3e%3c/g%3e%3c/svg%3e";
const fakerJS = "/assets/faker-D6l4cpmx.svg";
const fly = "/assets/fly-COcofn25.svg";
const github = "data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%2324292f'/%3e%3c/svg%3e";
const msw = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='128px'%20height='128px'%20viewBox='0%200%20128%20128'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eLOGO%3c/title%3e%3cg%20id='LOGO'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3crect%20id='Rectangle'%20fill='%23000000'%20x='0'%20y='0'%20width='128'%20height='128'%20rx='24'%3e%3c/rect%3e%3cg%20id='logo'%20transform='translate(-27.172013,%20-27.850148)'%20stroke-width='17.85'%3e%3cg%20id='Group'%20transform='translate(91.172013,%2091.850148)%20rotate(-42.000000)%20translate(-91.172013,%20-91.850148)%20translate(30.956217,%2022.472129)'%3e%3cpath%20d='M63.77676,39.8567809%20C66.7201615,39.8567809%2069.3849115,41.0498301%2071.3138112,42.9787297%20C73.2427108,44.9076293%2074.43576,47.5723793%2074.43576,50.5157809%20C74.43576,53.1536096%2073.4576536,55.6977418%2071.690581,57.6562093%20L40.9074742,91.7734893%20C40.2942428,92.4531409%2039.4635827,92.8198888%2038.6163176,92.863416%20C37.7690524,92.9069431%2036.9051822,92.6272495%2036.2255306,92.0140181%20L5.20189513,57.6562093%20C3.23012026,55.470868%202.33079774,52.693193%202.47075426,49.9689097%20C2.61071079,47.2446264%203.78994636,44.5737347%205.97528769,42.6019599%20C7.93375514,40.8348872%2010.4778874,39.8567809%2013.1157161,39.8567809%20Z'%20id='back'%20stroke='%23FF3333'%20opacity='0.48'%20transform='translate(38.446238,%2069.378019)%20rotate(90.000000)%20translate(-38.446238,%20-69.378019)%20'%3e%3c/path%3e%3cpath%20d='M123.833688,39.8567809%20C124.7491,39.8567809%20125.57785,40.2278249%20126.177747,40.8277219%20C126.777644,41.4276189%20127.148688,42.2563689%20127.148688,43.1717809%20C127.148688,43.9921582%20126.844492,44.7833955%20126.294924,45.3924883%20L84.4465906,91.7734893%20C83.8333592,92.4531409%2083.0026991,92.8198888%2082.1554339,92.863416%20C81.3081688,92.9069431%2080.4442986,92.6272495%2079.764647,92.0140181%20L37.6757849,45.3924883%20C37.0625535,44.7128367%2036.7828599,43.8489665%2036.826387,43.0017013%20C36.8699142,42.1544362%2037.2366621,41.3237761%2037.9163137,40.7105447%20C38.5254064,40.1609766%2039.3166437,39.8567809%2040.1370211,39.8567809%20Z'%20id='front'%20stroke='%23FF6A33'%20transform='translate(81.985354,%2069.378019)%20rotate(-90.000000)%20translate(-81.985354,%20-69.378019)%20'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const playwright = "/assets/playwright-D0Du3LFd.svg";
const prettier = "/assets/prettier-DbIVlkV4.svg";
const prisma$1 = "/assets/prisma-IaIz7Mrr.svg";
const radixUI = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='250'%20height='250'%20viewBox='0%200%2025%2025'%20fill='none'%20style='margin-right:3px'%3e%3cpath%20d='M12%2025C7.58173%2025%204%2021.4183%204%2017C4%2012.5817%207.58173%209%2012%209V25Z'%20fill='currentcolor'%3e%3c/path%3e%3cpath%20d='M12%200H4V8H12V0Z'%20fill='currentcolor'%3e%3c/path%3e%3cpath%20d='M17%208C19.2091%208%2021%206.20914%2021%204C21%201.79086%2019.2091%200%2017%200C14.7909%200%2013%201.79086%2013%204C13%206.20914%2014.7909%208%2017%208Z'%20fill='currentcolor'%3e%3c/path%3e%3c/svg%3e";
const reactEmail = "/assets/react-email-DKP-k4Ck.svg";
const remix = "data:image/svg+xml,%3csvg%20width='800'%20height='800'%20viewBox='0%200%20800%20800'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='800'%20height='800'%20fill='%23212121'/%3e%3cg%20filter='url(%23filter0_dd_126_53)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M587.947%20527.768C592.201%20582.418%20592.201%20608.036%20592.201%20636H465.756C465.756%20629.909%20465.865%20624.337%20465.975%20618.687C466.317%20601.123%20466.674%20582.807%20463.828%20545.819C460.067%20491.667%20436.748%20479.634%20393.871%20479.634H355.883H195V381.109H399.889C454.049%20381.109%20481.13%20364.633%20481.13%20321.011C481.13%20282.654%20454.049%20259.41%20399.889%20259.41H195V163H422.456C545.069%20163%20606%20220.912%20606%20313.42C606%20382.613%20563.123%20427.739%20505.201%20435.26C554.096%20445.037%20582.681%20472.865%20587.947%20527.768Z'%20fill='%23E8F2FF'/%3e%3cpath%20d='M195%20636V562.553H328.697C351.029%20562.553%20355.878%20579.116%20355.878%20588.994V636H195Z'%20fill='%23E8F2FF'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_dd_126_53'%20x='131'%20y='99'%20width='539'%20height='601'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset/%3e%3cfeGaussianBlur%20stdDeviation='28'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='out'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.223529%200%200%200%200%200.572549%200%200%200%200%201%200%200%200%201%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_126_53'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset/%3e%3cfeGaussianBlur%20stdDeviation='32'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='out'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200.223529%200%200%200%200%200.572549%200%200%200%200%201%200%200%200%200.9%200'/%3e%3cfeBlend%20mode='normal'%20in2='effect1_dropShadow_126_53'%20result='effect2_dropShadow_126_53'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect2_dropShadow_126_53'%20result='shape'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e";
const resend$1 = "/assets/resend-qZaqO_xw.svg";
const sentry = "data:image/svg+xml,%3csvg%20class='css-lfbo6j%20e10nushx4'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20222%2066'%20width='400'%20height='119'%3e%3cpath%20d='M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z%20M124.32,28.28,109.56,9.22h-3.68V34.77h3.73V15.19l15.18,19.58h3.26V9.22h-3.73ZM87.15,23.54h13.23V20.22H87.14V12.53h14.93V9.21H83.34V34.77h18.92V31.45H87.14ZM71.59,20.3h0C66.44,19.06,65,18.08,65,15.7c0-2.14,1.89-3.59,4.71-3.59a12.06,12.06,0,0,1,7.07,2.55l2-2.83a14.1,14.1,0,0,0-9-3c-5.06,0-8.59,3-8.59,7.27,0,4.6,3,6.19,8.46,7.52C74.51,24.74,76,25.78,76,28.11s-2,3.77-5.09,3.77a12.34,12.34,0,0,1-8.3-3.26l-2.25,2.69a15.94,15.94,0,0,0,10.42,3.85c5.48,0,9-2.95,9-7.51C79.75,23.79,77.47,21.72,71.59,20.3ZM195.7,9.22l-7.69,12-7.64-12h-4.46L186,24.67V34.78h3.84V24.55L200,9.22Zm-64.63,3.46h8.37v22.1h3.84V12.68h8.37V9.22H131.08ZM169.41,24.8c3.86-1.07,6-3.77,6-7.63,0-4.91-3.59-8-9.38-8H154.67V34.76h3.8V25.58h6.45l6.48,9.2h4.44l-7-9.82Zm-10.95-2.5V12.6h7.17c3.74,0,5.88,1.77,5.88,4.84s-2.29,4.86-5.84,4.86Z'%20transform='translate(11,%2011)'%20fill='%23362d59'%3e%3c/path%3e%3c/svg%3e";
const shadcnUI = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%3e%3crect%20width='256'%20height='256'%20fill='none'%3e%3c/rect%3e%3cline%20x1='208'%20y1='128'%20x2='128'%20y2='208'%20fill='none'%20stroke='currentColor'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='16'%3e%3c/line%3e%3cline%20x1='192'%20y1='40'%20x2='40'%20y2='192'%20fill='none'%20stroke='currentColor'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='16'%3e%3c/line%3e%3c/svg%3e";
const sqlite = "/assets/sqlite-C780ctma.svg";
const tailwind = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2054%2033'%3e%3cg%20clip-path='url(%23prefix__clip0)'%3e%3cpath%20fill='%2338bdf8'%20fill-rule='evenodd'%20d='M27%200c-7.2%200-11.7%203.6-13.5%2010.8%202.7-3.6%205.85-4.95%209.45-4.05%202.054.513%203.522%202.004%205.147%203.653C30.744%2013.09%2033.808%2016.2%2040.5%2016.2c7.2%200%2011.7-3.6%2013.5-10.8-2.7%203.6-5.85%204.95-9.45%204.05-2.054-.513-3.522-2.004-5.147-3.653C36.756%203.11%2033.692%200%2027%200zM13.5%2016.2C6.3%2016.2%201.8%2019.8%200%2027c2.7-3.6%205.85-4.95%209.45-4.05%202.054.514%203.522%202.004%205.147%203.653C17.244%2029.29%2020.308%2032.4%2027%2032.4c7.2%200%2011.7-3.6%2013.5-10.8-2.7%203.6-5.85%204.95-9.45%204.05-2.054-.513-3.522-2.004-5.147-3.653C23.256%2019.31%2020.192%2016.2%2013.5%2016.2z'%20clip-rule='evenodd'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='prefix__clip0'%3e%3cpath%20fill='%23fff'%20d='M0%200h54v32.4H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const testingLibrary = "/assets/testing-library-DlPZpWfP.png";
const typescript = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='512'%20height='512'%20fill='none'%20version='1.1'%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:cc='http://creativecommons.org/ns%23'%20xmlns:dc='http://purl.org/dc/elements/1.1/'%20xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23'%3e%3ctitle%3eTypeScript%20logo%3c/title%3e%3crect%20width='512'%20height='512'%20rx='50'%20fill='%233178c6'/%3e%3cpath%20d='m317%20407v50c8.1%204.2%2018%207.3%2029%209.4s23%203.1%2035%203.1c12%200%2023-1.1%2034-3.4%2011-2.3%2020-6.1%2028-11%208.1-5.3%2015-12%2019-21s7.1-19%207.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9-5.2-2.6-9.7-5.2-13-7.8-3.7-2.7-6.5-5.5-8.5-8.4-2-3-3-6.3-3-10%200-3.4%200.89-6.5%202.7-9.3s4.3-5.1%207.5-7.1c3.2-2%207.2-3.5%2012-4.6%204.7-1.1%209.9-1.6%2016-1.6%204.2%200%208.6%200.31%2013%200.94%204.6%200.63%209.3%201.6%2014%202.9%204.7%201.3%209.3%202.9%2014%204.9%204.4%202%208.5%204.3%2012%206.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12%200-23%201.3-34%203.8s-20%206.5-28%2012c-8.1%205.4-14%2012-19%2021-4.7%208.4-7%2018-7%2030%200%2015%204.3%2028%2013%2038%208.6%2011%2022%2019%2039%2027%206.9%202.8%2013%205.6%2019%208.3s11%205.5%2015%208.4c4.3%202.9%207.7%206.1%2010%209.5%202.5%203.4%203.8%207.4%203.8%2012%200%203.2-0.78%206.2-2.3%209s-3.9%205.2-7.1%207.2-7.1%203.6-12%204.8c-4.7%201.1-10%201.7-17%201.7-11%200-22-1.9-32-5.7-11-3.8-21-9.5-30-17zm-84-123h64v-41h-179v41h64v183h51z'%20clip-rule='evenodd'%20fill='%23fff'%20fill-rule='evenodd'%20style='fill:%23fff'/%3e%3c/svg%3e";
const vitest = "data:image/svg+xml,%3csvg%20width='165'%20height='165'%20viewBox='0%200%20165%20165'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M120.831%2057.2543L84.693%20109.505C84.3099%20110.059%2083.7558%20110.474%2083.1148%20110.687C82.4738%20110.9%2081.7809%20110.898%2081.1412%20110.684C80.5015%20110.469%2079.95%20110.052%2079.5702%20109.497C79.1905%20108.941%2079.0032%20108.277%2079.037%20107.606L80.4833%2078.7582L57.1343%2073.8064C56.6353%2073.7007%2056.1704%2073.474%2055.7807%2073.1465C55.391%2072.8191%2055.0885%2072.4009%2054.9001%2071.929C54.7117%2071.4571%2054.6432%2070.9461%2054.7006%2070.4412C54.758%2069.9364%2054.9395%2069.4532%2055.2291%2069.0345L91.3675%2016.7837C91.7507%2016.2294%2092.3048%2015.8145%2092.9458%2015.6018C93.5869%2015.3891%2094.2798%2015.3902%2094.9196%2015.6051C95.5593%2015.8199%2096.1109%2016.2367%2096.4906%2016.7923C96.8703%2017.3478%2097.0575%2018.0117%2097.0236%2018.6833L95.5773%2047.5314L118.926%2052.4828C119.425%2052.5885%20119.89%2052.8152%20120.28%2053.1426C120.67%2053.4701%20120.972%2053.8883%20121.16%2054.3602C121.349%2054.8321%20121.417%2055.3431%20121.36%2055.8479C121.303%2056.3528%20121.121%2056.836%20120.831%2057.2547L120.831%2057.2543Z'%20fill='%23FCC72B'/%3e%3cpath%20d='M82.9866%20153.343C82.0254%20153.344%2081.0735%20153.156%2080.1855%20152.788C79.2975%20152.42%2078.4909%20151.88%2077.8122%20151.2L43.6658%20117.056C42.2998%20115.683%2041.5341%20113.824%2041.5366%20111.887C41.5392%20109.95%2042.3098%20108.092%2043.6796%20106.723C45.0493%20105.353%2046.9064%20104.582%2048.8435%20104.579C50.7807%20104.577%2052.6399%20105.342%2054.0134%20106.708L82.9866%20135.678L146.105%2072.5626C147.481%2071.2088%20149.336%2070.4536%20151.266%2070.4615C153.197%2070.4693%20155.046%2071.2396%20156.41%2072.6045C157.775%2073.9695%20158.546%2075.8184%20158.554%2077.7487C158.561%2079.679%20157.806%2081.5342%20156.452%2082.9101L88.1597%20151.2C87.4811%20151.881%2086.6747%20152.42%2085.7869%20152.788C84.8992%20153.156%2083.9475%20153.344%2082.9866%20153.343Z'%20fill='%23729B1B'/%3e%3cpath%20d='M82.9572%20153.343C83.9184%20153.344%2084.8703%20153.156%2085.7583%20152.788C86.6463%20152.42%2087.4528%20151.88%2088.1316%20151.2L122.278%20117.056C123.644%20115.683%20124.41%20113.824%20124.407%20111.887C124.405%20109.95%20123.634%20108.092%20122.264%20106.723C120.894%20105.353%20119.037%20104.582%20117.1%20104.579C115.163%20104.577%20113.304%20105.342%20111.93%20106.708L82.9572%20135.678L19.8389%2072.5626C18.4629%2071.2088%2016.6077%2070.4536%2014.6775%2070.4615C12.7472%2070.4693%2010.8982%2071.2396%209.53331%2072.6045C8.16839%2073.9695%207.39811%2075.8184%207.39025%2077.7487C7.38239%2079.679%208.13759%2081.5342%209.49135%2082.9101L77.784%20151.2C78.4627%20151.881%2079.2691%20152.42%2080.1568%20152.788C81.0446%20153.156%2081.9963%20153.344%2082.9572%20153.343Z'%20fill='%23729B1B'%20fill-opacity='0.5'/%3e%3c/svg%3e";
const zod = "/assets/zod-TYtFcqGX.svg";
const logos = [
  {
    src: remix,
    alt: "Remix",
    href: "https://remix.run",
    column: 1,
    row: 1
  },
  {
    src: fly,
    alt: "Fly.io",
    href: "https://fly.io",
    column: 1,
    row: 2
  },
  {
    src: sqlite,
    alt: "SQLite",
    href: "https://sqlite.org",
    column: 1,
    row: 3
  },
  {
    src: prisma$1,
    alt: "Prisma",
    href: "https://prisma.io",
    column: 2,
    row: 2
  },
  {
    src: zod,
    alt: "Zod",
    href: "https://zod.dev/",
    column: 2,
    row: 3
  },
  {
    src: github,
    alt: "GitHub",
    href: "https://github.com",
    column: 2,
    row: 4
  },
  {
    src: resend$1,
    alt: "Resend",
    href: "https://resend.com",
    column: 2,
    row: 5
  },
  {
    src: reactEmail,
    alt: "React Email",
    href: "https://react.email",
    column: 2,
    row: 6
  },
  {
    src: tailwind,
    alt: "Tailwind CSS",
    href: "https://tailwindcss.com",
    column: 3,
    row: 3
  },
  {
    src: radixUI,
    alt: "Radix UI",
    href: "https://www.radix-ui.com/",
    column: 3,
    row: 4
  },
  {
    src: shadcnUI,
    alt: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    column: 3,
    row: 5
  },
  {
    src: playwright,
    alt: "Playwright",
    href: "https://playwright.dev/",
    column: 4,
    row: 1
  },
  {
    src: msw,
    alt: "MSW",
    href: "https://mswjs.io",
    column: 4,
    row: 2
  },
  {
    src: fakerJS,
    alt: "Faker.js",
    href: "https://fakerjs.dev/",
    column: 4,
    row: 3
  },
  {
    src: vitest,
    alt: "Vitest",
    href: "https://vitest.dev",
    column: 4,
    row: 4
  },
  {
    src: testingLibrary,
    alt: "Testing Library",
    href: "https://testing-library.com",
    column: 4,
    row: 5
  },
  {
    src: docker,
    alt: "Docker",
    href: "https://www.docker.com",
    column: 4,
    row: 6
  },
  {
    src: typescript,
    alt: "TypeScript",
    href: "https://typescriptlang.org",
    column: 5,
    row: 2
  },
  {
    src: prettier,
    alt: "Prettier",
    href: "https://prettier.io",
    column: 5,
    row: 3
  },
  {
    src: eslint,
    alt: "ESLint",
    href: "https://eslint.org",
    column: 5,
    row: 4
  },
  {
    src: sentry,
    alt: "Sentry",
    href: "https://sentry.io",
    column: 5,
    row: 5
  }
];
const generalAPI = {
  getAnnouncements: async function() {
    const response = await api.request({
      url: `/general/announcements`,
      method: "GET"
    });
    return response.data;
  },
  getTrendingBusinesses: async function(id) {
    const response = await api.request({
      url: `/general/trendingBusinesses`,
      method: "GET"
    });
    return response.data;
  },
  getDownTrendingBusinesses: async function(id, email, amount, paymentId, status) {
    const response = await api.request({
      url: `/general/downtrendingBusinesses`,
      method: "GET"
    });
    return response.data;
  },
  getLocalCompanies: async function(latitude, longitude) {
    const response = await api.request({
      url: `/general/localBusinesses`,
      method: "GET",
      params: {
        latitude,
        longitude
      }
    });
    return response.data;
  },
  getPublicCompany: async function(id) {
    const response = await api.request({
      url: `/general/getStock`,
      method: "GET",
      params: {
        businessId: id
      }
    });
    return response.data;
  }
};
const columnClasses = {
  1: "xl:col-start-1",
  2: "xl:col-start-2",
  3: "xl:col-start-3",
  4: "xl:col-start-4",
  5: "xl:col-start-5"
};
const rowClasses = {
  1: "xl:row-start-1",
  2: "xl:row-start-2",
  3: "xl:row-start-3",
  4: "xl:row-start-4",
  5: "xl:row-start-5",
  6: "xl:row-start-6"
};
const loader$k = async ({ request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2) {
      const announcements = await generalAPI.getAnnouncements();
      const trendingBusinesses = await generalAPI.getTrendingBusinesses();
      const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();
      return json({
        announcements,
        trendingBusinesses,
        downtrendingBusinesses,
        userId: user2._id
      });
    } else {
      const announcements = await generalAPI.getAnnouncements();
      const trendingBusinesses = await generalAPI.getTrendingBusinesses();
      const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();
      return json({
        announcements,
        trendingBusinesses,
        downtrendingBusinesses
      });
    }
  } else {
    const announcements = await generalAPI.getAnnouncements();
    const trendingBusinesses = await generalAPI.getTrendingBusinesses();
    const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();
    return json({
      announcements,
      trendingBusinesses,
      downtrendingBusinesses
    });
  }
};
const meta$2 = () => {
  return [
    { title: `Co Owners` },
    { property: "og:title", content: `Co-Owners` },
    { property: "og:description", content: `The CommUnity Owners Monopoly Game` },
    { property: "og:image", content: `https://co-owners.ca/logo.png` },
    { property: "og:url", content: `https://co-owners.ca/` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Co-Owners` },
    { name: "twitter:description", content: `The CommUnity Owners Monopoly Game` },
    { name: "twitter:image", content: `https://co-owners.ca/logo.png` },
    { name: "twitter:url", content: `https://co-owners.ca/` }
  ];
};
function Index() {
  const navigate = useNavigate();
  const { announcements, trendingBusinesses, downtrendingBusinesses, userId } = useLoaderData();
  const handleClick = (businessId) => {
    navigate(`/stocks/${businessId}`);
  };
  return /* @__PURE__ */ jsxs("main", { className: "font-poppins grid h-full place-items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid place-items-center gap-4 xl:grid-cols-2 xl:gap-4", children: [
      announcements.map((announcement) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex w-full max-w-xs flex-col items-center text-center xl:max-w-2xl xl:order-2 xl:items-start xl:text-left bg-white shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 xl:p-[10vh]",
          children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: announcement.website,
                className: "animate-slide-top [animation-fill-mode:backwards] xl:animate-slide-left xl:[animation-delay:0.5s] xl:[animation-fill-mode:backwards]",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: announcement.logo,
                    alt: "Business Logo",
                    className: "w-20 h-20 text-foreground xl:w-24 xl:h-24 xl:-mt-4"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "h1",
              {
                "data-heading": true,
                className: "mt-4 text-lg font-medium text-foreground animate-slide-top [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-xl xl:mt-4 xl:animate-slide-left xl:text-4xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]",
                children: announcement.name
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                "data-paragraph": true,
                className: "mt-4 text-base text-muted-foreground animate-slide-top [animation-delay:0.8s] [animation-fill-mode:backwards] md:text-lg xl:mt-8 xl:animate-slide-left xl:text-xl xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]",
                children: announcement.description
              }
            )
          ]
        },
        announcement.id
      )),
      /* @__PURE__ */ jsx("ul", { className: "mt-16 flex w-full s:max-w-xs flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6", children: /* @__PURE__ */ jsx(TooltipProvider, { children: logos.map((logo, i) => /* @__PURE__ */ jsx(
        "li",
        {
          className: cn(
            columnClasses[logo.column],
            rowClasses[logo.row],
            "animate-roll-reveal [animation-fill-mode:backwards]"
          ),
          style: { animationDelay: `${i * 0.07}s` },
          children: /* @__PURE__ */ jsx(Tooltip, { children: /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24" }) }) })
        },
        logo.href
      )) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-2xl font-bold text-center text-green-500", children: "Trending Stocks" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row flex-wrap justify-center items-center overflow-x-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4", children: trendingBusinesses.map((business) => /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-full max-w-xs p-4 bg-white shadow-md rounded-lg cursor-pointer", onClick: () => handleClick(business.businessId), children: [
        /* @__PURE__ */ jsx("img", { src: business.logo, alt: "Business Logo", className: "w-full h-32 object-contain" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg mt-2 mb-5 font-semibold", children: business.name }),
        /* @__PURE__ */ jsx("p", { children: "Current Price: " }),
        /* @__PURE__ */ jsxs("p", { children: [
          "$",
          business.currentPricePerShare.toFixed(2),
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-green-500", children: [
            "(",
            business.growthPercentage.toFixed(2),
            "%)"
          ] })
        ] })
      ] }, business.businessId)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl lg:text-2xl font-bold text-center text-red-500", children: "Declining Stocks" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row flex-wrap justify-center items-center overflow-x-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4", children: downtrendingBusinesses.map((business) => /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-full max-w-xs p-4 bg-white shadow-md rounded-lg cursor-pointer sm:w-64", onClick: () => handleClick(business.businessId), children: [
        /* @__PURE__ */ jsx("img", { src: business.logo, alt: "Business Logo", className: "w-full h-32 object-contain" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg mt-2 mb-5 font-semibold", children: business.name }),
        /* @__PURE__ */ jsx("p", { children: "Current Price: " }),
        /* @__PURE__ */ jsxs("p", { children: [
          "$",
          business.lastValuation.toFixed(2),
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-red-500", children: [
            "(",
            business.changePercentage.toFixed(2),
            "%)"
          ] })
        ] })
      ] }, business.businessId)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 w-full flex justify-center gap-5", children: [
      /* @__PURE__ */ jsx(Link, { to: "/stocks", children: /* @__PURE__ */ jsx("button", { className: "bg-blue-500 text-white font-bold py-5 px-8 rounded-xl hover:bg-blue-700 text-xl", children: "Browse Stocks" }) }),
      userId ? /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsx("button", { className: "bg-purple-500 text-white font-bold py-5 px-8 rounded-xl hover:bg-purple-700 text-xl", children: "Dashboard" }) }) : ""
    ] })
  ] });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$k,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function PrivacyRoute() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "Privacy Policy for CommUnity Owners" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Last updated: March 15, 2024" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'This Privacy Policy describes how CommUnity Owners (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from https://co-owners.ca (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.' }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services." }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Changes to This Privacy Policy" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.' }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "How We Collect and Use Your Personal Information" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us." }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others." }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "What Personal Information We Collect" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.' }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4", children: "Information We Collect Directly from You" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Information that you directly submit to us through our Services may include:" }),
    /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside mb-4", children: [
      /* @__PURE__ */ jsx("li", { children: "Basic contact details including your name, address, phone number, email." }),
      /* @__PURE__ */ jsx("li", { children: "Order information including your name, address, payment confirmation, email address, phone number." }),
      /* @__PURE__ */ jsx("li", { children: "Account information including your username, and password." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: 'Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.' }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies." }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Your Rights and Choices" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law." }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "- Right to Access / Know. You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.",
      /* @__PURE__ */ jsx("br", {}),
      "- Right to Delete. You may have a right to request that we delete personal information we maintain about you.",
      /* @__PURE__ */ jsx("br", {}),
      "- Right to Correct. You may have a right to request that we correct inaccurate personal information we maintain about you.",
      /* @__PURE__ */ jsx("br", {}),
      "- Right of Portability. You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.",
      /* @__PURE__ */ jsx("br", {})
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "- Right to Limit and/or Opt out of Use and Disclosure of Sensitive Personal Information. You may have a right to direct us to limit our use and/or disclosure of sensitive personal information to only what is necessary to perform the Services or provide the goods reasonably expected by an average individual.",
      /* @__PURE__ */ jsx("br", {}),
      "- Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information.",
      /* @__PURE__ */ jsx("br", {}),
      "- Withdrawal of Consent: Where we rely on consent to process your personal information, you may have the right to withdraw this consent.",
      /* @__PURE__ */ jsx("br", {}),
      "- Appeal: You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.",
      /* @__PURE__ */ jsx("br", {}),
      "- Managing Communication Preferences: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.",
      /* @__PURE__ */ jsx("br", {})
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below." }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, You may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law." }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Complaints" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority." }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "International Users" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
      "Please note that we may transfer, store and process your personal information outside the country you live in, including the United States. Your personal information is also processed by staff and third party service providers and partners in these countries.",
      /* @__PURE__ */ jsx("br", {}),
      "If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection."
    ] })
  ] });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PrivacyRoute
}, Symbol.toStringTag, { value: "Module" }));
function SupportRoute() {
  return /* @__PURE__ */ jsx("div", { children: "Support" });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SupportRoute
}, Symbol.toStringTag, { value: "Module" }));
const marketingPreset = {
  theme: {
    extend: {
      keyframes: {
        "roll-reveal": {
          from: { transform: "rotate(12deg) scale(0)", opacity: "0" },
          to: { transform: "rotate(0deg) scale(1)", opacity: "1" }
        },
        "slide-left": {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0px)", opacity: "1" }
        },
        "slide-top": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0px)", opacity: "1" }
        }
      },
      animation: {
        "roll-reveal": "roll-reveal 0.4s cubic-bezier(.22,1.28,.54,.99)",
        "slide-left": "slide-left 0.3s ease-out",
        "slide-top": "slide-top 0.3s ease-out"
      }
    }
  }
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  marketingPreset
}, Symbol.toStringTag, { value: "Module" }));
function TermsOfServiceRoute() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ jsx("header", { className: "mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "Terms of Service" }) }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "1. Acceptance of Terms" }),
      /* @__PURE__ */ jsx("p", { children: "By accessing or using the CommUnity Owners community platform, you agree to comply with and be bound by these Terms of Service." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "2. Description of Service" }),
      /* @__PURE__ */ jsx("p", { children: "Our service provides a platform for small business membership purchase trading, allowing users to buy and sell memberships." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "3. User Responsibilities" }),
      /* @__PURE__ */ jsx("p", { children: "Users are responsible for maintaining the confidentiality of their accounts and passwords. Any activities that occur under their account are their responsibility." }),
      /* @__PURE__ */ jsx("p", { children: "By using the CommUnity Owners Community website, you agree to:" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside ml-6", children: [
        /* @__PURE__ */ jsx("li", { children: "Provide accurate and complete information when registering for an account." }),
        /* @__PURE__ */ jsx("li", { children: "Maintain the confidentiality of your account login information." }),
        /* @__PURE__ */ jsx("li", { children: "Comply with all applicable laws and regulations." }),
        /* @__PURE__ */ jsx("li", { children: "Not use the platform for any illegal or unauthorized purpose." }),
        /* @__PURE__ */ jsx("li", { children: "Not use the platform to transmit any unsolicited or unauthorized advertising or promotional materials." }),
        /* @__PURE__ */ jsx("li", { children: "Not use the platform to harass, intimidate, or harm any other user." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "4. Prohibited Activities" }),
      /* @__PURE__ */ jsx("p", { children: "Users must not engage in any illegal or unauthorized activities while using the CommUnity Owners community App. This includes but is not limited to fraud, market manipulation, and unauthorized access to accounts." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "6. Disclaimer of Warranty" }),
      /* @__PURE__ */ jsx("p", { children: 'The CommUnity Owners community App is provided "as is" without any warranty. We do not guarantee the accuracy, completeness, or timeliness of the information provided.' })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "7. Limitation of Liability" }),
      /* @__PURE__ */ jsx("p", { children: "We are not liable for any damages or losses resulting from the use of our webapp. Users use the service at their own risk." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "8. Governing Law" }),
      /* @__PURE__ */ jsx("p", { children: "These Terms of Service are governed by and construed in accordance with the laws of Canada." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "9. Changes to This Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { children: 'We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on this page and update the "Effective Date" at the top of this page.' })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "10. Intellectual Property" }),
      /* @__PURE__ */ jsx("p", { children: "The content of the CommUnity Owners Community website, including without limitation, the text, graphics, logos, and button icons, is the property of CommUnity Owners Community or its suppliers and is protected by copyright laws. Any trademarks or service marks displayed on the website are the property of their respective owners." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "11. Termination" }),
      /* @__PURE__ */ jsx("p", { children: "CommUnity Owners Community reserves the right to terminate or suspend your access to the CommUnity Owners Community website and services at any time, with or without cause, and without notice." })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "These Terms of Service were last updated on November 15, 2024." }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
        "Contact us at ",
        /* @__PURE__ */ jsx("a", { href: "mailto:ptang@co-owners.ca", className: "text-blue-500 hover:underline", children: "ptang@co-owners.ca" }),
        " for any questions regarding these terms."
      ] })
    ] })
  ] });
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TermsOfServiceRoute
}, Symbol.toStringTag, { value: "Module" }));
const businessAPI = {
  createBusiness: async function(name, address, city, state, country, latitude, longitude, website, description, image, businessImages) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", image);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("website", website);
    formData.append("description", description);
    businessImages.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const response = await api.request({
        url: `/business/createBusiness`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    } catch (error) {
      toast.error("Creation Error", {
        description: "Error in creating this business"
      });
      throw error;
    }
  }
};
const loader$j = async ({ request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2 && user2.role === "admin") {
      return json({ message: "You are an admin" });
    } else {
      return redirect$1("/");
    }
  } else {
    return redirect$1("/");
  }
};
function CreateCompany() {
  useLoaderData();
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = useState(null);
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [businessImages, setBusinessImages] = useState([]);
  const [businessPreviews, setBusinessPreviews] = useState([]);
  const options2 = {
    types: ["geocode"],
    componentRestrictions: { country: ["ca", "us"] }
  };
  useEffect(() => {
    const loadScript = (url, callback) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
    };
    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A&libraries=places`, () => {
      const addressInput = document.getElementById("address");
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(addressInput, options2);
      autoCompleteRef.current.addListener("place_changed", handlePlaceSelect);
    });
  }, []);
  const createBusiness = async () => {
    const response = await businessAPI.createBusiness(name, address, city, state, country, latitude, longitude, website, description, image, businessImages);
    if (response.status === 200) {
      toast.success("Business Created", {
        description: "Business has been created"
      });
    }
  };
  const handlePlaceSelect = (place) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const addressObject = (_a2 = autoCompleteRef.current) == null ? void 0 : _a2.getPlace();
    if (!addressObject) return;
    const address2 = addressObject.address_components;
    if (address2) {
      setAddress(addressObject.formatted_address || "");
      for (let i = 0; i < address2.length; i++) {
        if ((_b = address2[i]) == null ? void 0 : _b.types.includes("locality")) {
          console.log((_c = address2[i]) == null ? void 0 : _c.long_name);
          setCity(((_d = address2[i]) == null ? void 0 : _d.long_name) || "");
        }
        if (address2[i] && ((_e = address2[i]) == null ? void 0 : _e.types.includes("administrative_area_level_1"))) {
          setState(((_f = address2[i]) == null ? void 0 : _f.long_name) || "");
        }
        if (address2[i] && ((_g = address2[i]) == null ? void 0 : _g.types.includes("country"))) {
          setCountry(((_h = address2[i]) == null ? void 0 : _h.long_name) || "");
        }
      }
      if (addressObject.geometry && addressObject.geometry.location) {
        setLatitude(addressObject.geometry.location.lat().toString());
        setLongitude(addressObject.geometry.location.lng().toString());
      }
    }
  };
  const handleImageChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) {
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleBusinessImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length + businessImages.length > 10) {
      toast.error("Image Error", {
        description: "You can only upload a maximum of 10 images"
      });
      return;
    }
    setBusinessImages((prevImages) => [...prevImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setBusinessPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (autoCompleteRef.current === null || autoCompleteRef.current.getPlace() === void 0) {
      toast.error("Address Error", {
        description: "Address cannot be empty"
      });
    } else if (name.length < 1) {
      toast.error("Name Error", {
        description: "Name cannot be empty"
      });
    } else if (!image) {
      toast.error("Image Error", {
        description: "Image cannot be empty"
      });
    } else {
      setLoading(true);
      createBusiness().then(() => {
      }).catch((error) => {
        console.error(error);
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full min-h-screen bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-lg shadow-lg w-full max-w-lg space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-center", children: "Add a Business" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          id: "logo",
          accept: "image/*",
          onChange: handleImageChange,
          className: "hidden"
        }
      ),
      preview ? /* @__PURE__ */ jsx("label", { htmlFor: "logo", className: "cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("img", { src: preview, alt: "preview", className: "w-24 h-24 rounded-full object-cover" }),
        /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm text-gray-600", children: "Upload Business Logo" })
      ] }) }) : /* @__PURE__ */ jsx("label", { htmlFor: "logo", className: "cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("img", { className: "w-24 h-24 rounded-full object-cover", src: "/img/profileUpload.png", alt: "default" }),
        /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm text-gray-600", children: "Upload the business logo" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "inputBox", children: /* @__PURE__ */ jsx(
      TextInput,
      {
        id: "name",
        label: "Business Name",
        styles: { input: { borderColor: "#ccc", borderWidth: "1px", width: "100%", height: "2rem", borderRadius: "1rem", padding: "1rem" } },
        value: name,
        onChange: (e) => setName(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "inputBox", children: /* @__PURE__ */ jsx(
      TextInput,
      {
        id: "address",
        label: "Address",
        value: address,
        ref: inputRef,
        onChange: (e) => setAddress(e.target.value),
        styles: { input: { borderColor: "#ccc", borderWidth: "1px", width: "100%", height: "2rem", borderRadius: "1rem", padding: "1rem" } }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "inputBox", children: /* @__PURE__ */ jsx(
      Textarea,
      {
        id: "description",
        label: "Description",
        value: description,
        onChange: (e) => setDescription(e.target.value),
        minRows: 4,
        styles: { input: { borderColor: "#ccc", borderWidth: "1px", width: "100%", borderRadius: "1rem", padding: "1rem" } }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "inputBox", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "images", className: "block text-sm font-medium text-gray-700", children: "Upload Images (Max 10)" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "images",
          type: "file",
          accept: "image/*",
          multiple: true,
          onChange: handleBusinessImageChange,
          className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-5 gap-2", children: businessPreviews.map((preview2, index) => /* @__PURE__ */ jsx("img", { src: preview2, alt: `Preview ${index}`, className: "w-16 h-16 object-cover rounded-md" }, index)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "inputBox", children: /* @__PURE__ */ jsx(
      TextInput,
      {
        id: "website",
        label: "Website",
        value: website,
        onChange: (e) => setWebsite(e.target.value),
        styles: { input: { borderColor: "#ccc", borderWidth: "1px", width: "100%", height: "2rem", borderRadius: "1rem", padding: "1rem" } }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Form, { method: "post", onSubmit: handleSubmit, className: "w-full", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-blue-600 hover:bg-green-600 hover:text-white border-2 border-blue-600 text-white font-bold py-3 px-4 rounded-xl w-full", children: "Register" }) }) })
  ] }) });
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateCompany,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const SidebarDropdown = ({ item }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("ul", { className: "my-2 flex flex-col gap-1.5 pl-9", children: item.map((item2, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
    Link,
    {
      to: item2.route,
      className: `relative flex rounded-[7px] px-3.5 py-2 font-medium duration-300 ease-in-out ${location.pathname === item2.route ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"}`,
      children: [
        item2.label,
        item2.pro && /* @__PURE__ */ jsx("span", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-1.5 py-px text-[10px] font-medium leading-[17px] text-white", children: "Pro" })
      ]
    }
  ) }, index)) }) });
};
const SidebarItem = ({ item, pageName, setPageName }) => {
  const handleClick = () => {
    const updatedPageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: item.route,
        onClick: handleClick,
        className: `${pageName === item.label.toLowerCase() ? "bg-gray-500 text-white dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"} group relative flex items-center gap-3 rounded-[7px] px-3.5 py-3 font-medium duration-300 ease-in-out`,
        children: [
          item.icon,
          item.label,
          item.message && /* @__PURE__ */ jsx("span", { className: "absolute right-11.5 top-1/2 -translate-y-1/2 rounded-full bg-red-light-6 px-1.5 py-px text-[10px] font-medium leading-[17px] text-red", children: item.message }),
          item.pro && /* @__PURE__ */ jsx("span", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-primary px-1.5 py-px text-[10px] font-medium leading-[17px] text-white", children: "Pro" }),
          item.children && /* @__PURE__ */ jsx(
            "svg",
            {
              className: `absolute right-3.5 top-1/2 -translate-y-1/2 fill-current ${pageName !== item.label.toLowerCase() && "rotate-180"}`,
              width: "22",
              height: "22",
              viewBox: "0 0 22 22",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M10.5525 7.72801C10.81 7.50733 11.1899 7.50733 11.4474 7.72801L17.864 13.228C18.1523 13.4751 18.1857 13.9091 17.9386 14.1974C17.6915 14.4857 17.2575 14.5191 16.9692 14.272L10.9999 9.15549L5.03068 14.272C4.7424 14.5191 4.30838 14.4857 4.06128 14.1974C3.81417 13.9091 3.84756 13.4751 4.13585 13.228L10.5525 7.72801Z",
                  fill: ""
                }
              )
            }
          )
        ]
      }
    ),
    item.children && /* @__PURE__ */ jsx(
      "div",
      {
        className: `translate transform overflow-hidden ${pageName !== item.label.toLowerCase() && "hidden"}`,
        children: /* @__PURE__ */ jsx(SidebarDropdown, { item: item.children })
      }
    )
  ] }) });
};
const ClickOutside = ({
  children,
  exceptionRef,
  onClick,
  className
}) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickListener = (event) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target) || exceptionRef.current && exceptionRef.current === event.target || exceptionRef.current && exceptionRef.current.contains(event.target);
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target);
      }
      if (!clickedInside) onClick();
    };
    document.addEventListener("mousedown", handleClickListener);
    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);
  return /* @__PURE__ */ jsx("div", { ref: wrapperRef, className: `${className || ""}`, children });
};
const adminMenuGroups = [
  {
    name: "ADMIN",
    menuItems: [
      {
        icon: /* @__PURE__ */ jsx(
          "svg",
          {
            fill: "none",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M323.5-192h-9a1.5,1.5,0,0,0-1.5,1.5V-176h12v-14.5A1.5,1.5,0,0,0,323.5-192ZM318-177v-3h2v3Zm6,0h-3v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5v3.5h-3v-13.5a.5.5,0,0,1,.5-.5h9a.5.5,0,0,1,.5.5Zm-8-12h2v2h-2Zm4,0h2v2h-2Zm-4,4h2v2h-2Zm4,0h2v2h-2Z",
                transform: "translate(-313 192)",
                fill: "white"
              }
            )
          }
        ),
        label: "Create Company",
        route: "/admin/createcompany"
      },
      {
        icon: /* @__PURE__ */ jsx(
          "svg",
          {
            fill: "none",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M17 13H21V19C21 20.1046 20.1046 21 19 21M17 13V19C17 20.1046 17.8954 21 19 21M17 13V5.75707C17 4.85168 17 4.39898 16.8098 4.13646C16.6439 3.90746 16.3888 3.75941 16.1076 3.72897C15.7853 3.69408 15.3923 3.91868 14.6062 4.36788L14.2938 4.54637C14.0045 4.7117 13.8598 4.79438 13.7062 4.82675C13.5702 4.85539 13.4298 4.85539 13.2938 4.82675C13.1402 4.79438 12.9955 4.7117 12.7062 4.54637L10.7938 3.45359C10.5045 3.28826 10.3598 3.20559 10.2062 3.17322C10.0702 3.14457 9.92978 3.14457 9.79383 3.17322C9.64019 3.20559 9.49552 3.28826 9.20618 3.4536L7.29382 4.54637C7.00448 4.71171 6.85981 4.79438 6.70617 4.82675C6.57022 4.85539 6.42978 4.85539 6.29383 4.82675C6.14019 4.79438 5.99552 4.71171 5.70618 4.54637L5.39382 4.36788C4.60772 3.91868 4.21467 3.69408 3.89237 3.72897C3.61123 3.75941 3.35611 3.90746 3.1902 4.13646C3 4.39898 3 4.85168 3 5.75707V16.2C3 17.8801 3 18.7202 3.32698 19.362C3.6146 19.9264 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H19M12 10.5C11.5 10.376 10.6851 10.3714 10 10.376C9.77091 10.3775 9.90941 10.3678 9.6 10.376C8.79258 10.4012 8.00165 10.7368 8 11.6875C7.99825 12.7003 9 13 10 13C11 13 12 13.2312 12 14.3125C12 15.1251 11.1925 15.4812 10.1861 15.5991C9.3861 15.5991 9 15.625 8 15.5M10 16V17M10 8.99998V9.99998",
                stroke: "#000000",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                fill: "white"
              }
            )
          }
        ),
        label: "Confirm Receipts",
        route: "/upload/receipt"
      }
    ]
  }
];
const menuGroups = [
  {
    name: "DASHBOARD",
    menuItems: [
      {
        icon: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "text-white fill-current",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M9.00009 17.2498C8.58588 17.2498 8.25009 17.5856 8.25009 17.9998C8.25009 18.414 8.58588 18.7498 9.00009 18.7498H15.0001C15.4143 18.7498 15.7501 18.414 15.7501 17.9998C15.7501 17.5856 15.4143 17.2498 15.0001 17.2498H9.00009Z",
                  fill: "white"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M12 1.25C11.2749 1.25 10.6134 1.44911 9.88928 1.7871C9.18832 2.11428 8.37772 2.59716 7.36183 3.20233L5.90622 4.06943C4.78711 4.73606 3.89535 5.26727 3.22015 5.77524C2.52314 6.29963 1.99999 6.8396 1.65907 7.55072C1.31799 8.26219 1.22554 9.0068 1.25519 9.87584C1.2839 10.717 1.43105 11.7397 1.61556 13.0219L1.90792 15.0537C2.14531 16.7036 2.33368 18.0128 2.61512 19.0322C2.90523 20.0829 3.31686 20.9169 4.05965 21.5565C4.80184 22.1956 5.68984 22.4814 6.77634 22.6177C7.83154 22.75 9.16281 22.75 10.8423 22.75H13.1577C14.8372 22.75 16.1685 22.75 17.2237 22.6177C18.3102 22.4814 19.1982 22.1956 19.9404 21.5565C20.6831 20.9169 21.0948 20.0829 21.3849 19.0322C21.6663 18.0129 21.8547 16.7036 22.0921 15.0537L22.3844 13.0219C22.569 11.7396 22.7161 10.717 22.7448 9.87584C22.7745 9.0068 22.682 8.26219 22.3409 7.55072C22 6.8396 21.4769 6.29963 20.7799 5.77524C20.1047 5.26727 19.2129 4.73606 18.0938 4.06943L16.6382 3.20233C15.6223 2.59716 14.8117 2.11428 14.1107 1.7871C13.3866 1.44911 12.7251 1.25 12 1.25ZM8.09558 4.51121C9.15309 3.88126 9.89923 3.43781 10.5237 3.14633C11.1328 2.86203 11.5708 2.75 12 2.75C12.4293 2.75 12.8672 2.86203 13.4763 3.14633C14.1008 3.43781 14.8469 3.88126 15.9044 4.51121L17.2893 5.33615C18.4536 6.02973 19.2752 6.52034 19.8781 6.9739C20.4665 7.41662 20.7888 7.78294 20.9883 8.19917C21.1877 8.61505 21.2706 9.09337 21.2457 9.82469C21.2201 10.5745 21.0856 11.5163 20.8936 12.8511L20.6148 14.7884C20.3683 16.5016 20.1921 17.7162 19.939 18.633C19.6916 19.5289 19.3939 20.0476 18.9616 20.4198C18.5287 20.7926 17.9676 21.0127 17.037 21.1294C16.086 21.2486 14.8488 21.25 13.1061 21.25H10.8939C9.15124 21.25 7.91405 21.2486 6.963 21.1294C6.03246 21.0127 5.47129 20.7926 5.03841 20.4198C4.60614 20.0476 4.30838 19.5289 4.06102 18.633C3.80791 17.7162 3.6317 16.5016 3.3852 14.7884L3.10643 12.851C2.91437 11.5163 2.77991 10.5745 2.75432 9.82469C2.72937 9.09337 2.81229 8.61505 3.01167 8.19917C3.21121 7.78294 3.53347 7.41662 4.12194 6.9739C4.72482 6.52034 5.54643 6.02973 6.71074 5.33615L8.09558 4.51121Z",
                  fill: "white"
                }
              )
            ]
          }
        ),
        label: "Overview",
        route: "/dashboard"
      },
      {
        icon: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 text-white dark:text-white",
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            fill: "none",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                stroke: "currentColor",
                "stroke-linecap": "round",
                "stroke-width": "2",
                d: "M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
              }
            )
          }
        ),
        label: "Browse Stocks",
        route: "/"
      },
      {
        icon: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            fill: "white",
            viewBox: "0 0 122.88 66.49",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                stroke: "white",
                "stroke-linecap": "round",
                "stroke-width": "2",
                d: "M2.27,18.3H34.05a2.27,2.27,0,0,1,2.27,2.27V64.22a2.27,2.27,0,0,1-2.27,2.27H2.27A2.27,2.27,0,0,1,0,64.22V20.57A2.27,2.27,0,0,1,2.27,18.3ZM68.4,9.44V31H61V17.39l-4.52,1.8-2-5.3,7.66-4.45ZM26,49.45H11V43.81l2.84-2.75c.62-.57,1.21-1.13,1.77-1.7L17,38a7.69,7.69,0,0,0,1-1.24,3.52,3.52,0,0,0,.54-1,2.82,2.82,0,0,0,.09-.71,1.08,1.08,0,0,0-.5-1.08,4.54,4.54,0,0,0-1.73-.23,24,24,0,0,0-4.32.36l-.69.13L11,28.58a21.3,21.3,0,0,1,7.12-1.21A9.13,9.13,0,0,1,24,29.06a5.64,5.64,0,0,1,2.12,4.68,9.36,9.36,0,0,1-1,4.7A11.9,11.9,0,0,1,21.45,42l-2.19,1.54H26v5.9ZM103.1,37.19q4.82,0,7,1.37t2.18,4.85a6.81,6.81,0,0,1-.44,2.75,4.59,4.59,0,0,1-1.56,1.74A6.49,6.49,0,0,1,112,49.78a5.44,5.44,0,0,1,.52,2.64q0,4.09-2.13,5.65t-6.58,1.55A28.12,28.12,0,0,1,98,59l-1.08-.23L97.07,53q3.77.33,5.37.33a8,8,0,0,0,2.13-.18.76.76,0,0,0,.53-.79.91.91,0,0,0-.37-.83,2.48,2.48,0,0,0-1.37-.33H98.74v-5.8h4.32c1.18,0,1.77-.33,1.77-1s-.75-1-2.26-1c-1,0-2.53.08-4.52.23l-.85.07L97,38.14a26.29,26.29,0,0,1,6.06-1ZM45.55,0H77.33A2.27,2.27,0,0,1,79.6,2.27v62a2.27,2.27,0,0,1-2.27,2.27H45.55a2.27,2.27,0,0,1-2.27-2.27V2.27A2.27,2.27,0,0,1,45.55,0ZM88.83,30.35h31.78a2.28,2.28,0,0,1,2.27,2.27v31.6a2.27,2.27,0,0,1-2.27,2.27H88.83a2.27,2.27,0,0,1-2.27-2.27V32.62a2.27,2.27,0,0,1,2.27-2.27Z"
              }
            )
          }
        ),
        label: "Leaderboard",
        route: "/leaderboard"
      }
    ]
  },
  {
    name: "HISTORY",
    menuItems: [
      {
        icon: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "text-white fill-current",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M14.2544 1.36453C13.1584 1.05859 12.132 1.38932 11.4026 2.05955C10.6845 2.71939 10.25 3.70552 10.25 4.76063V11.4551C10.25 12.7226 11.2775 13.75 12.5449 13.75H19.2394C20.2945 13.75 21.2806 13.3156 21.9405 12.5974C22.6107 11.868 22.9414 10.8416 22.6355 9.74563C21.5034 5.69003 18.31 2.49663 14.2544 1.36453ZM11.75 4.76063C11.75 4.10931 12.0201 3.52918 12.4175 3.16407C12.8035 2.80935 13.3035 2.65643 13.8511 2.8093C17.4013 3.80031 20.1997 6.59875 21.1907 10.1489C21.3436 10.6965 21.1907 11.1965 20.8359 11.5825C20.4708 11.9799 19.8907 12.25 19.2394 12.25H12.5449C12.1059 12.25 11.75 11.8941 11.75 11.4551V4.76063Z",
                  fill: "white"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M8.67232 4.71555C9.0675 4.59143 9.28724 4.17045 9.16312 3.77527C9.039 3.38009 8.61803 3.16036 8.22285 3.28447C4.18231 4.55353 1.25 8.32793 1.25 12.7892C1.25 18.2904 5.70962 22.75 11.2108 22.75C15.6721 22.75 19.4465 19.8177 20.7155 15.7772C20.8397 15.382 20.6199 14.961 20.2247 14.8369C19.8296 14.7128 19.4086 14.9325 19.2845 15.3277C18.2061 18.761 14.9982 21.25 11.2108 21.25C6.53805 21.25 2.75 17.462 2.75 12.7892C2.75 9.00185 5.23899 5.79389 8.67232 4.71555Z",
                  fill: "white"
                }
              )
            ]
          }
        ),
        label: "Transactions",
        route: "/history"
      }
    ]
  },
  {
    name: "ACCOUNTS",
    menuItems: [
      {
        icon: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "text-white fill-current",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M11.9999 1.25C9.37654 1.25 7.24989 3.37665 7.24989 6C7.24989 8.62335 9.37654 10.75 11.9999 10.75C14.6232 10.75 16.7499 8.62335 16.7499 6C16.7499 3.37665 14.6232 1.25 11.9999 1.25ZM8.74989 6C8.74989 4.20507 10.205 2.75 11.9999 2.75C13.7948 2.75 15.2499 4.20507 15.2499 6C15.2499 7.79493 13.7948 9.25 11.9999 9.25C10.205 9.25 8.74989 7.79493 8.74989 6Z",
                  fill: "white"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M11.9999 12.25C9.68634 12.25 7.55481 12.7759 5.97534 13.6643C4.41937 14.5396 3.24989 15.8661 3.24989 17.5L3.24982 17.602C3.24869 18.7638 3.24728 20.222 4.5263 21.2635C5.15577 21.7761 6.03637 22.1406 7.2261 22.3815C8.41915 22.6229 9.97412 22.75 11.9999 22.75C14.0257 22.75 15.5806 22.6229 16.7737 22.3815C17.9634 22.1406 18.844 21.7761 19.4735 21.2635C20.7525 20.222 20.7511 18.7638 20.75 17.602L20.7499 17.5C20.7499 15.8661 19.5804 14.5396 18.0244 13.6643C16.445 12.7759 14.3134 12.25 11.9999 12.25ZM4.74989 17.5C4.74989 16.6487 5.37127 15.7251 6.71073 14.9717C8.02669 14.2315 9.89516 13.75 11.9999 13.75C14.1046 13.75 15.9731 14.2315 17.289 14.9717C18.6285 15.7251 19.2499 16.6487 19.2499 17.5C19.2499 18.8078 19.2096 19.544 18.5263 20.1004C18.1558 20.4022 17.5364 20.6967 16.4761 20.9113C15.4192 21.1252 13.9741 21.25 11.9999 21.25C10.0257 21.25 8.58063 21.1252 7.52368 20.9113C6.46341 20.6967 5.84401 20.4022 5.47348 20.1004C4.79021 19.544 4.74989 18.8078 4.74989 17.5Z",
                  fill: "white"
                }
              )
            ]
          }
        ),
        label: "Profile",
        route: "/user"
      }
    ]
  }
];
const Sidebar = ({ sidebarOpen, setSidebarOpen, userRole }) => {
  const [pageName, setPageName] = useState("Overview");
  const [isOpen, setIsOpen] = useState(false);
  if (isMobile) {
    const adminItem = [
      { name: "Create Company", path: "/admin/createcompany" },
      { name: "Process Receipts", path: "/upload/receipt" }
    ];
    const menuItems = [
      { name: "Overview", path: "/dashboard" },
      { name: "Browse Stocks", path: "/" },
      { name: "Leaderboard", path: "/leaderboard" },
      { name: "Transactions", path: "/history" },
      { name: "Profile", path: "/user" }
    ];
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return /* @__PURE__ */ jsxs("nav", { className: "relative bg-black text-white w-full", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleMenu,
          className: "md:hidden z-50 relative p-4",
          "aria-label": "Toggle Menu",
          children: isOpen ? "✕" : "☰"
        }
      ),
      isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 w-full bg-black shadow-lg md:hidden", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col items-center space-y-4 p-4", children: [
        userRole === "admin" && adminItem.map((item) => /* @__PURE__ */ jsx("li", { className: "w-full text-center", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: item.path,
            className: "block py-2 px-4 hover:bg-gray-700",
            children: item.name
          }
        ) }, item.path)),
        menuItems.map((item) => /* @__PURE__ */ jsx("li", { className: "w-full text-center", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: item.path,
            className: "block py-2 px-4 hover:bg-gray-700",
            children: item.name
          }
        ) }, item.path))
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex space-x-4 p-4", children: menuItems.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.path,
          className: "text-gray-300 hover:text-blue-500",
          children: item.name
        },
        item.path
      )) })
    ] });
  } else {
    return /* @__PURE__ */ jsx(ClickOutside, { onClick: () => setSidebarOpen(false), children: /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed left-0 top-0 z-50 flex min-h-full pr-5 flex-col border-r border-stroke bg-black dark:border-stroke-dark dark:bg-gray-dark overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-10", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSidebarOpen(!sidebarOpen),
              className: "block lg:hidden",
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "text-white fill-current",
                  width: "20",
                  height: "18",
                  viewBox: "0 0 20 18",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z",
                      fill: "white"
                    }
                  )
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear", children: /* @__PURE__ */ jsxs("nav", { className: "mt-1 px-4 lg:px-6 text-gray-500", children: [
            userRole === "admin" && adminMenuGroups.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-5 text-sm font-medium text-dark-4 dark:text-dark-6", children: group.name }),
              /* @__PURE__ */ jsx("ul", { className: "mb-6 flex flex-col gap-2 text-gray-400", children: group.menuItems.map((menuItem, menuIndex) => /* @__PURE__ */ jsx(
                SidebarItem,
                {
                  item: menuItem,
                  pageName,
                  setPageName
                },
                menuIndex
              )) })
            ] }, groupIndex)),
            menuGroups.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-5 text-sm font-medium text-dark-4 dark:text-dark-6", children: group.name }),
              /* @__PURE__ */ jsx("ul", { className: "mb-6 flex flex-col gap-2 text-gray-400", children: group.menuItems.map((menuItem, menuIndex) => /* @__PURE__ */ jsx(
                SidebarItem,
                {
                  item: menuItem,
                  pageName,
                  setPageName
                },
                menuIndex
              )) })
            ] }, groupIndex))
          ] }) })
        ]
      }
    ) });
  }
};
Chart.register(ArcElement, Tooltip$1, Legend, ChartDataLabels);
function generateRandomColor() {
  const randomValue = () => Math.floor(Math.random() * 256);
  const r = randomValue();
  const g = randomValue();
  const b = randomValue();
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
function AccountBalance({ token, balance, gains, investments }) {
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsClient(true);
  }, []);
  const investments_assigned = investments.map((business) => ({
    ...business,
    backgroundColor: generateRandomColor()
  }));
  const data = {
    labels: investments_assigned.map((business) => business.name),
    datasets: [
      {
        label: "Portfolio Distribution",
        data: investments_assigned.map((business) => business.currentPricePerShare),
        backgroundColor: investments_assigned.map((business) => business.backgroundColor),
        borderWidth: 1
      }
    ]
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        formatter: (value, context) => {
          const dataset = context.chart.data.datasets[0];
          const total = (dataset == null ? void 0 : dataset.data.reduce((acc, value2) => acc + value2, 0)) || 0;
          const percentage = (value / total * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "white",
        font: {
          weight: "bold",
          size: 15
        }
      }
    }
  };
  function BusinessList() {
    return /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col max-h-96 overflow-y-auto", children: investments_assigned.slice(0, 4).map((business) => /* @__PURE__ */ jsx("div", { className: "flex items-center p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs(Link, { to: `/stocks/${business.id}`, className: "flex items-center w-full", children: [
      /* @__PURE__ */ jsx("img", { src: business.logo, alt: business.name, className: "w-10 h-10 mr-4" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 text-left", children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", style: { color: business.backgroundColor }, children: business.name }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-2 text-left", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          "$",
          business.currentPricePerShare.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `text-lg font-bold ${business.growthAmount.toString().startsWith("-") ? "text-red-500" : "text-green-500"}`, children: [
          business.growthAmount.toString().startsWith("-") ? "" : "+",
          " ",
          business.growthAmount.toFixed(2)
        ] })
      ] })
    ] }) }, business.id)) });
  }
  function handleDeposit() {
    const redirectUrlParams = new URLSearchParams({
      amount: "0.00",
      balance: balance.toFixed(2),
      token,
      redirect: `/dashboard`,
      type: "deposit"
    }).toString();
    const redirectUrl = "/stripe?" + redirectUrlParams;
    navigate(redirectUrl);
  }
  function handleWithdraw() {
    const redirectUrlParams = new URLSearchParams({
      amount: "0.00",
      balance: balance.toFixed(2),
      token,
      redirect: `/dashboard`,
      type: "withdraw"
    }).toString();
    const redirectUrl = "/stripe?" + redirectUrlParams;
    navigate(redirectUrl);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row bg-white p-4 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Account Balance" }),
      /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold", children: [
        "$",
        balance.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center mt-2", children: gains > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-green-500 p-2 rounded-xl shadow-xl", style: { boxShadow: "0 4px 15px rgba(34, 197, 94, 0.5)" }, children: /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "text-white text-5xl" }) }),
        /* @__PURE__ */ jsx("div", { className: "ml-5", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-green-500", children: [
          "+",
          gains.toFixed(2),
          " lifetime"
        ] }) })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-red-500 p-2 rounded-xl shadow-xl", style: { boxShadow: "0 4px 15px rgba(239, 68, 68, 0.5)" }, children: /* @__PURE__ */ jsx(FaArrowTrendDown, { className: "text-white text-5xl" }) }),
        /* @__PURE__ */ jsx("div", { className: "ml-5", children: /* @__PURE__ */ jsxs("p", { className: "text-lg text-red-500", children: [
          gains.toFixed(2),
          " lifetime"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between mt-4 w-full", children: [
        /* @__PURE__ */ jsx("button", { className: "text-blue-600 hover:bg-green-600 hover:text-white border-2 border-blue-600 font-bold py-3 px-4 m-1 lg:m-3 rounded-xl w-full", onClick: handleDeposit, children: "Deposit" }),
        /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-red-500 text-white font-bold py-3 px-4 m-1 lg:m-3 rounded-xl w-full", onClick: handleWithdraw, children: "Withdraw" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block border-l-2 border-gray-300 mx-4" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row w-full lg:w-1/2 mt-4 lg:mt-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", style: { height: "30vh" }, children: isClient && /* @__PURE__ */ jsx(Doughnut, { data, options: options2 }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex", children: /* @__PURE__ */ jsx(BusinessList, {}) })
    ] })
  ] });
}
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);
const Valuation = ({ profit, valuation }) => {
  const chartRef = useRef(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const profitData = {
    dates: profit.map((item) => `${monthNames[item.month - 1]} ${item.year}`),
    profit: profit.map((item) => item.profit.toFixed(2))
  };
  const valuationData = {
    dates: valuation.map((item) => `${monthNames[item.month - 1]} ${item.year}`),
    valuation: valuation.map((item) => item.maxPricePerShare.toFixed(2))
  };
  const labelDates = profitData.dates.length > valuationData.dates.length ? profitData.dates : valuationData.dates;
  if (profitData.dates.length > valuationData.dates.length) {
    const diff = profitData.dates.length - valuationData.dates.length;
    for (let i = 0; i < diff; i++) {
      valuationData.dates.push("");
      valuationData.valuation.push("0");
    }
  } else if (valuationData.dates.length > profitData.dates.length) {
    const diff = valuationData.dates.length - profitData.dates.length;
    for (let i = 0; i < diff; i++) {
      profitData.dates.push("");
      profitData.profit.push("0");
    }
  }
  const data = {
    labels: labelDates,
    datasets: [
      {
        label: "Profit",
        data: profitData.profit,
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: true,
        // Enable fill under the line
        tension: 0.4,
        // Smooth out the lines
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(75, 192, 192, 0.5)");
          gradient.addColorStop(1, "rgba(75, 192, 192, 0)");
          return gradient;
        }
      },
      {
        label: "Portfolio Value",
        data: valuationData.valuation,
        borderColor: "rgba(153, 102, 255, 1)",
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: true,
        // Enable fill under the line
        tension: 0.4,
        // Smooth out the lines
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(153, 102, 255, 0.5)");
          gradient.addColorStop(1, "rgba(153, 102, 255, 0)");
          return gradient;
        }
      }
    ]
  };
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      title: {
        display: true,
        text: "Current Revenue and Portfolio Gains"
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)"
        }
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Valuation" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow-md", style: { height: "50vh" }, children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(Line, { ref: chartRef, data, options: options2 }) }) })
  ] });
};
Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip$1, Legend, CategoryScale);
const WatchList = ({ watchlist }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isMobile && watchlist.length > 1 && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      let scrollAmount = 0;
      const scrollStep = 2;
      const scrollInterval = setInterval(() => {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }, 20);
      return () => clearInterval(scrollInterval);
    } else if (watchlist.length > 5 && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      let scrollAmount = 0;
      const scrollStep = 2;
      const scrollInterval = setInterval(() => {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }, 20);
      return () => clearInterval(scrollInterval);
    }
  }, [watchlist]);
  const handleItemClick = (id) => {
    navigate(`/stocks/${id}`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 mt-4 text-center sm:text-left", children: "Watch List" }),
    /* @__PURE__ */ jsx("div", { ref: scrollContainerRef, className: "flex overflow-x-auto space-x-4 pb-10", children: watchlist.map((business, index) => /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md cursor-pointer", onClick: () => handleItemClick(business.id), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
        /* @__PURE__ */ jsx("img", { src: business.logo, alt: business.name, className: "w-12 h-12 mr-4" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold", children: business.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xl font-semibold", children: [
          "$",
          business.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: `text-lg font-bold ${business.change.startsWith("-") ? "text-red-500" : "text-green-500"}`, children: business.change }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "this month" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-24", children: /* @__PURE__ */ jsx(
        Line,
        {
          data: {
            labels: Array.from({ length: business.chartData.length }, (_, i) => i),
            datasets: [
              {
                data: business.chartData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                display: false
              }
            }
          }
        }
      ) })
    ] }, index)) })
  ] });
};
const loader$i = async ({ params, request }) => {
  new URL(request.url);
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2) {
      const { balance, historical_gains, monthly_gains, businesses } = await userAPI.getUserBalanceStocks(session);
      const { monthlyProfits, monthlyValuation } = await userAPI.getUserProfitValuation(session);
      const { watchlist } = await userAPI.getUserWatchList(session);
      return json({ session, user: user2, balance, historical_gains, monthly_gains, businesses, profit: monthlyProfits, valuation: monthlyValuation, watchlist });
    } else {
      return redirect$1("/");
    }
  } else {
    return redirectWithToast("/login", { type: "error", title: "Not Logged In!", description: "You must be logged in to view this page" });
  }
};
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, user: user2, balance, historical_gains, monthly_gains, businesses, profit, valuation, watchlist, tab, leaderboard } = useLoaderData();
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-gray-200", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx(Sidebar, { sidebarOpen, setSidebarOpen, userRole: user2.role }) }),
      /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[1vw] pr-[1vw] pt-[2vw] pb-[2vw]", children: /* @__PURE__ */ jsx(AccountBalance, { token: session, balance, gains: historical_gains, investments: businesses }) }),
      /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[1vw] pr-[1vw]", children: /* @__PURE__ */ jsx(Valuation, { profit, valuation }) }),
      /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[5vw] pr-[5vw]", children: /* @__PURE__ */ jsx(WatchList, { watchlist }) })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "flex overflow-hidden", children: [
      /* @__PURE__ */ jsx(Sidebar, { sidebarOpen, setSidebarOpen, userRole: user2.role }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[5vw] pr-[5vw] pt-[2vw] pb-[2vw]", children: /* @__PURE__ */ jsx(AccountBalance, { token: session, balance, gains: historical_gains, investments: businesses }) }),
        /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[5vw] pr-[5vw]", children: /* @__PURE__ */ jsx(Valuation, { profit, valuation }) }),
        /* @__PURE__ */ jsx("div", { className: "items-center justify-between pl-[5vw] pr-[5vw]", children: /* @__PURE__ */ jsx(WatchList, { watchlist }) })
      ] })
    ] });
  }
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$h = async ({ request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2) {
      const history = user2.history.reverse();
      return json({ history, session, role: user2.role });
    } else {
      return redirect$1("/");
    }
  } else {
    return redirectWithToast("/login", {
      title: "Login Required",
      description: "You need to be logged in to view this page",
      type: "error"
    });
  }
};
const History = () => {
  const { history, session, role } = useLoaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (session) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row bg-gray-200", children: [
      /* @__PURE__ */ jsx(Sidebar, { sidebarOpen, setSidebarOpen, userRole: role }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4 text-center", children: "Transaction History" }),
        /* @__PURE__ */ jsx(TabContent$1, { title: "Transaction History", data: history })
      ] })
    ] });
  }
};
const applyPagination$1 = (data, page, limit) => {
  return data.slice(page * limit, page * limit + limit);
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const TabContent$1 = ({ title, data }) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(data.length / limit);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const paginatedData = applyPagination$1(data, page - 1, limit);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TableContainer, { component: Paper, className: "overflow-y-auto w-full rounded-sm", children: /* @__PURE__ */ jsxs(Table, { stickyHeader: true, className: "w-full", children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "text-left h-16", children: "Transaction Type" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-left h-16", children: "Business Name" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-left h-16", children: "Amount" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: paginatedData.map((history, index) => /* @__PURE__ */ jsxs(TableRow, { className: index % 2 === 0 ? "bg-gray-100" : "bg-white", children: [
        /* @__PURE__ */ jsxs(TableCell, { className: "h-10 pl-2", children: [
          /* @__PURE__ */ jsx("div", { children: capitalizeFirstLetter(history.type) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: new Date(history.orderDate).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsx(TableCell, { className: "h-10", children: history.type === "buy" || history.type === "sell" ? history.businessName : "" }),
        /* @__PURE__ */ jsxs(TableCell, { className: `h-10 ${["deposit", "sell"].includes(history.type) ? "text-green-500" : ["withdraw", "buy", "fee"].includes(history.type) ? "text-red-500" : ""}`, children: [
          "$",
          history.price.toFixed(2)
        ] })
      ] }, history._id)) })
    ] }) }),
    /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", justifyContent: "center", mt: 4, children: /* @__PURE__ */ jsxs("div", { className: "flex mt-5 flex-row gap-2 justify-center", children: [
      /* @__PURE__ */ jsx(IconButton, { onClick: handlePreviousPage, disabled: page === 1, children: /* @__PURE__ */ jsx(FaArrowLeft, {}) }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body1", mx: 2, children: [
        "Page ",
        page,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(IconButton, { onClick: handleNextPage, disabled: page === totalPages, children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
    ] }) })
  ] });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: History,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const leaderboardAPI = {
  getLeaderboard: async function(sessionToken) {
    try {
      const response = await api.request({
        url: `/users/getLeaderBoard`,
        method: "POST",
        data: {
          token: sessionToken
        }
      });
      return response;
    } catch (error) {
      toast.error("Leaderboard Failed", {
        description: "User not found"
      });
    }
  }
};
const loader$g = async ({ request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    const leaderboard = await leaderboardAPI.getLeaderboard(session);
    if (user2) {
      return json({ leaderboard: leaderboard.data, session, role: user2.role, username: user2.username });
    } else {
      return json({ leaderboard: leaderboard.data, session: null, role: null });
    }
  } else {
    const leaderboard = await leaderboardAPI.getLeaderboard(null);
    return json({ leaderboard: leaderboard.data, session: null, role: null });
  }
};
const meta$1 = () => {
  return [
    { title: `Co-Owners Leaderboard` },
    { property: "og:title", content: `Co-Owners Leaderboard` },
    { property: "og:description", content: `The CommUnity Owners Monopoly Leaderboard` },
    { property: "og:image", content: `https://co-owners.ca/logo.png` },
    { property: "og:url", content: `https://co-owners.ca/leaderboard` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Co-Owners Leaderboard` },
    { name: "twitter:description", content: `The CommUnity Owners Monopoly Leaderboard` },
    { name: "twitter:image", content: `https://co-owners.ca/logo.png` },
    { name: "twitter:url", content: `https://co-owners.ca/leaderboard` }
  ];
};
const Leaderboard = () => {
  const { leaderboard, session, role, username } = useLoaderData();
  const [activeTab, setActiveTab] = useState("tab1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  let totalProfitsBoard = leaderboard.topTotalReturns;
  let monthlyProfitsBoard = leaderboard.topMonthlyReturns;
  let totalTransactionsBoard = leaderboard.topTotalTrades;
  let monthlyTransactionsBoard = leaderboard.topMonthlyTrades;
  if (session) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row bg-gray-200", children: [
      /* @__PURE__ */ jsx(Sidebar, { sidebarOpen, setSidebarOpen, userRole: role }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4 text-center", children: "Leaderboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center mb-4 lg:space-x-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `px-4 py-2 rounded ${activeTab === "tab1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
              onClick: () => handleTabClick("tab1"),
              children: "Monthly Profits"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `px-4 py-2 rounded ${activeTab === "tab2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
              onClick: () => handleTabClick("tab2"),
              children: "Total Profits"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `px-4 py-2 rounded ${activeTab === "tab3" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
              onClick: () => handleTabClick("tab3"),
              children: "Monthly Transactions"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: `px-4 py-2 rounded ${activeTab === "tab4" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
              onClick: () => handleTabClick("tab4"),
              children: "Total Transactions"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [
          activeTab === "tab1" && /* @__PURE__ */ jsx(TabContent, { title: "Monthly Profits Leaderboard", data: monthlyProfitsBoard, username }),
          activeTab === "tab2" && /* @__PURE__ */ jsx(TabContent, { title: "Total Profits Leaderboard", data: totalProfitsBoard, username }),
          activeTab === "tab3" && /* @__PURE__ */ jsx(TabContent, { title: "Monthly Transactions Leaderboard", data: monthlyTransactionsBoard, username }),
          activeTab === "tab4" && /* @__PURE__ */ jsx(TabContent, { title: "Total Transactions Leaderboard", data: totalTransactionsBoard, username })
        ] })
      ] })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4 text-center", children: "Leaderboard" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center mb-4 lg:space-x-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-4 py-2 rounded ${activeTab === "tab1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
            onClick: () => handleTabClick("tab1"),
            children: "Weekly Profits"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-4 py-2 rounded ${activeTab === "tab2" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
            onClick: () => handleTabClick("tab2"),
            children: "Total Profits"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-4 py-2 rounded ${activeTab === "tab3" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
            onClick: () => handleTabClick("tab3"),
            children: "Weekly Transactions"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `px-4 py-2 rounded ${activeTab === "tab4" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`,
            onClick: () => handleTabClick("tab4"),
            children: "Total Transactions"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-md", children: [
        activeTab === "tab1" && /* @__PURE__ */ jsx(TabContent, { title: "Monthly Profits Leaderboard", data: monthlyProfitsBoard, username }),
        activeTab === "tab2" && /* @__PURE__ */ jsx(TabContent, { title: "Total Profits Leaderboard", data: totalProfitsBoard, username }),
        activeTab === "tab3" && /* @__PURE__ */ jsx(TabContent, { title: "Monthly Transactions Leaderboard", data: monthlyTransactionsBoard, username }),
        activeTab === "tab4" && /* @__PURE__ */ jsx(TabContent, { title: "Total Transactions Leaderboard", data: totalTransactionsBoard, username })
      ] })
    ] });
  }
};
const applyPagination = (data, page, limit) => {
  return data.slice(page * limit, page * limit + limit);
};
const TabContent = ({ title, data, username }) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(data.length / limit);
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const paginatedData = applyPagination(data, page - 1, limit);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: title }),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: paginatedData.map((user2, index) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: `flex items-center justify-between p-4 rounded-lg shadow-md ${user2.username === username ? "bg-red-500 text-white" : index % 2 === 0 ? "bg-gray-100" : "bg-white"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-md font-bold", children: user2.position }),
            /* @__PURE__ */ jsx("span", { className: "text-md", children: user2.username })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-md font-semibold", children: [
            title.includes("Profits") ? "$" : "",
            user2.score
          ] })
        ]
      },
      user2.position
    )) }) }),
    /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", justifyContent: "center", mt: 4, children: /* @__PURE__ */ jsxs("div", { className: "flex mt-5 flex-row gap-2 justify-center", children: [
      /* @__PURE__ */ jsx(IconButton, { onClick: handlePreviousPage, disabled: page === 1, children: /* @__PURE__ */ jsx(FaArrowLeft, {}) }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body1", mx: 2, children: [
        "Page ",
        page,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(IconButton, { onClick: handleNextPage, disabled: page === totalPages, children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
    ] }) })
  ] });
};
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Leaderboard,
  loader: loader$g,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader$f({ request }) {
  const user2 = await requireUserId(request);
  if (!user2) {
    const requestUrl = new URL(request.url);
    const loginParams = new URLSearchParams([
      ["redirectTo", `${requestUrl.pathname}${requestUrl.search}`]
    ]);
    const redirectTo = `/login?${loginParams}`;
    await logout({ request, redirectTo });
    return redirect$1(redirectTo);
  }
  return redirect$1(`/user`);
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
function loader$e({ request }) {
  return generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` }
  ]);
}
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
async function loader$d({ request, context }) {
  const serverBuild = await context.serverBuild;
  return generateSitemap(request, serverBuild.build.routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`
    }
  });
}
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
async function loader$c({ request }) {
  const user2 = await requireUserId(request);
  const domain = getDomainUrl(request);
  return json({
    user: {
      ...user2,
      image: user2.image ? {
        ...user2.image,
        url: `${domain}/resources/user-images/${user2.image.id}`
      } : null
    }
  });
}
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const resend = new Resend(process.env.RESEND_API_KEY);
const loader$b = async () => {
  const { data, error } = await resend.emails.send({
    from: "peter.tang.lai@gmail.com",
    to: "peter.tang.lai@gmail.com",
    subject: "Hello world",
    html: "<strong>It works!</strong>"
  });
  if (error) {
    return json({ error }, 400);
  }
  return json(data, 200);
};
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const BreadcrumbHandle = z.object({ breadcrumb: z.any() });
const handle$4 = {
  breadcrumb: /* @__PURE__ */ jsx(Icon, { name: "file-text", children: "Edit Profile" }),
  getSitemapEntries: () => null
};
const BreadcrumbHandleMatch = z.object({
  handle: BreadcrumbHandle
});
async function loader$a({ request }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const username = searchParams.get("username");
  return json({
    username
  });
}
function EditUserProfile$1() {
  useLoaderData();
  const matches = useMatches();
  const breadcrumbs = matches.map((m) => {
    const result = BreadcrumbHandleMatch.safeParse(m);
    if (!result.success || !result.data.handle.breadcrumb) return null;
    return /* @__PURE__ */ jsx(Link, { to: m.pathname, className: "flex items-center", children: result.data.handle.breadcrumb }, m.id);
  }).filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { className: "m-auto mb-24 mt-16 max-w-3xl", children: [
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("ul", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Link,
        {
          className: "text-muted-foreground",
          to: `/user`,
          children: "Profile"
        }
      ) }),
      breadcrumbs.map((breadcrumb, i, arr) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: cn("flex items-center gap-3", {
            "text-muted-foreground": i < arr.length - 1
          }),
          children: [
            "▶️ ",
            breadcrumb
          ]
        },
        i
      ))
    ] }) }),
    /* @__PURE__ */ jsx(Spacer, { size: "xs" }),
    /* @__PURE__ */ jsx("main", { className: "mx-auto bg-muted px-6 py-8 md:container md:rounded-3xl", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BreadcrumbHandle,
  default: EditUserProfile$1,
  handle: handle$4,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const handle$3 = {
  getSitemapEntries: () => null
};
const ProfileFormSchema = z.object({
  name: NameSchema.optional(),
  username: UsernameSchema,
  email: z.string().email()
});
async function loader$9({ request }) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const username = searchParams.get("username");
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  return json({
    username,
    id,
    name,
    email
  });
}
const profileUpdateActionIntent = "update-profile";
const signOutOfSessionsActionIntent = "sign-out-of-sessions";
const deleteDataActionIntent = "delete-data";
async function action$4({ request }) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case profileUpdateActionIntent: {
      return profileUpdateAction({ request, userId, formData });
    }
    case signOutOfSessionsActionIntent: {
      return signOutOfSessionsAction({ request, userId, formData });
    }
    case deleteDataActionIntent: {
      return deleteDataAction({ request, userId, formData });
    }
    default: {
      throw new Response(`Invalid intent "${intent}"`, { status: 400 });
    }
  }
}
function EditUserProfile() {
  useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-12", children: /* @__PURE__ */ jsx(UpdateProfile, {}) });
}
async function profileUpdateAction({ userId, formData }) {
  const response = await userAPI.updateProfile(userId, formData.get("name"), formData.get("username"), formData.get("email"));
  return json({
    result: response.data
  });
}
function UpdateProfile() {
  var _a2;
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    id: "edit-profile",
    constraint: getZodConstraint(ProfileFormSchema),
    lastResult: (_a2 = fetcher.data) == null ? void 0 : _a2.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProfileFormSchema });
    },
    defaultValue: {
      username: data.username,
      name: data.name,
      email: data.email
    }
  });
  return /* @__PURE__ */ jsxs(fetcher.Form, { method: "POST", ...getFormProps(form), children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-6 gap-x-10", children: [
      /* @__PURE__ */ jsx(
        Field,
        {
          className: "col-span-3",
          labelProps: {
            htmlFor: fields.username.id,
            children: "Username"
          },
          inputProps: getInputProps(fields.username, { type: "text" }),
          errors: fields.username.errors
        }
      ),
      /* @__PURE__ */ jsx(
        Field,
        {
          className: "col-span-3",
          labelProps: { htmlFor: fields.name.id, children: "Name" },
          inputProps: getInputProps(fields.name, { type: "text" }),
          errors: fields.name.errors
        }
      ),
      /* @__PURE__ */ jsx(
        Field,
        {
          className: "col-span-3",
          labelProps: {
            htmlFor: fields.username.id,
            children: "Email"
          },
          inputProps: getInputProps(fields.email, { type: "text" }),
          errors: fields.email.errors
        }
      )
    ] }),
    /* @__PURE__ */ jsx(ErrorList, { errors: form.errors, id: form.errorId }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsx(
      StatusButton,
      {
        type: "submit",
        size: "wide",
        name: "intent",
        value: profileUpdateActionIntent,
        status: fetcher.state !== "idle" ? "pending" : form.status ?? "idle",
        children: "Save changes"
      }
    ) })
  ] });
}
async function signOutOfSessionsAction({ request, userId }) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const sessionId = authSession.get(sessionKey);
  invariantResponse(
    sessionId,
    "You must be authenticated to sign out of other sessions"
  );
  return json({ status: "success" });
}
async function deleteDataAction({ userId }) {
  return redirectWithToast("/", {
    type: "success",
    title: "Data Deleted",
    description: "All of your data has been deleted"
  });
}
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: EditUserProfile,
  handle: handle$3,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const prisma = remember("prisma", () => {
  const logThreshold = 20;
  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" }
    ]
  });
  client.$on("query", async (e) => {
    if (e.duration < logThreshold) return;
    const color = e.duration < logThreshold * 1.1 ? "green" : e.duration < logThreshold * 1.2 ? "blue" : e.duration < logThreshold * 1.3 ? "yellow" : e.duration < logThreshold * 1.4 ? "redBright" : "red";
    const dur = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  });
  void client.$connect();
  return client;
});
const handle$2 = {
  breadcrumb: /* @__PURE__ */ jsx(Icon, { name: "lock-open-1", children: "Disable" }),
  getSitemapEntries: () => null
};
async function loader$8({ request }) {
  await requireRecentVerification(request);
  return json({});
}
async function action$3({ request }) {
  await requireRecentVerification(request);
  const userId = await requireUserId(request);
  await prisma.verification.delete({
    where: { target_type: { target: userId, type: twoFAVerificationType } }
  });
  return redirectWithToast("/settings/profile/two-factor", {
    title: "2FA Disabled",
    description: "Two factor authentication has been disabled."
  });
}
function TwoFactorDisableRoute() {
  const disable2FAFetcher = useFetcher();
  const dc = useDoubleCheck();
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-sm", children: /* @__PURE__ */ jsxs(disable2FAFetcher.Form, { method: "POST", children: [
    /* @__PURE__ */ jsx("p", { children: "Disabling two factor authentication is not recommended. However, if you would like to do so, click here:" }),
    /* @__PURE__ */ jsx(
      StatusButton,
      {
        variant: "destructive",
        status: disable2FAFetcher.state === "loading" ? "pending" : "idle",
        ...dc.getButtonProps({
          className: "mx-auto",
          name: "intent",
          value: "disable",
          type: "submit"
        }),
        children: dc.doubleCheck ? "Are you sure?" : "Disable 2FA"
      }
    )
  ] }) });
}
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: TwoFactorDisableRoute,
  handle: handle$2,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const handle$1 = {
  breadcrumb: /* @__PURE__ */ jsx(Icon, { name: "check", children: "Verify" }),
  getSitemapEntries: () => null
};
const CancelSchema = z.object({ intent: z.literal("cancel") });
const VerifySchema = z.object({
  intent: z.literal("verify"),
  code: z.string().min(6).max(6)
});
const ActionSchema = z.discriminatedUnion("intent", [
  CancelSchema,
  VerifySchema
]);
const twoFAVerifyVerificationType = "2fa-verify";
async function loader$7({ request }) {
  const userId = await requireUserId(request);
  const verification = await prisma.verification.findUnique({
    where: {
      target_type: { type: twoFAVerifyVerificationType, target: userId }
    },
    select: {
      id: true,
      algorithm: true,
      secret: true,
      period: true,
      digits: true
    }
  });
  if (!verification) {
    return redirect$1("/settings/profile/two-factor");
  }
  const user2 = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: true }
  });
  const issuer = new URL(getDomainUrl(request)).host;
  const otpUri = getTOTPAuthUri({
    ...verification,
    accountName: user2.email,
    issuer
  });
  const qrCode = await QRCode.toDataURL(otpUri);
  return json({ otpUri, qrCode });
}
async function action$2({ request }) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    schema: () => ActionSchema.superRefine(async (data, ctx) => {
      if (data.intent === "cancel") return null;
      const codeIsValid = await isCodeValid({
        code: data.code,
        type: twoFAVerifyVerificationType,
        target: userId
      });
      if (!codeIsValid) {
        ctx.addIssue({
          path: ["code"],
          code: z.ZodIssueCode.custom,
          message: `Invalid code`
        });
        return z.NEVER;
      }
    }),
    async: true
  });
  if (submission.status !== "success") {
    return json(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }
  switch (submission.value.intent) {
    case "cancel": {
      await prisma.verification.deleteMany({
        where: { type: twoFAVerifyVerificationType, target: userId }
      });
      return redirect$1("/settings/profile/two-factor");
    }
    case "verify": {
      await prisma.verification.update({
        where: {
          target_type: { type: twoFAVerifyVerificationType, target: userId }
        },
        data: { type: twoFAVerificationType }
      });
      return redirectWithToast("/settings/profile/two-factor", {
        type: "success",
        title: "Enabled",
        description: "Two-factor authentication has been enabled."
      });
    }
  }
}
function TwoFactorRoute$1() {
  var _a2;
  const data = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isPending = useIsPending();
  const pendingIntent = isPending ? (_a2 = navigation.formData) == null ? void 0 : _a2.get("intent") : null;
  const [form, fields] = useForm({
    id: "verify-form",
    constraint: getZodConstraint(ActionSchema),
    lastResult: actionData == null ? void 0 : actionData.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ActionSchema });
    }
  });
  const lastSubmissionIntent = fields.intent.value;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsx("img", { alt: "qr code", src: data.qrCode, className: "h-56 w-56" }),
    /* @__PURE__ */ jsx("p", { children: "Scan this QR code with your authenticator app." }),
    /* @__PURE__ */ jsx("p", { className: "text-sm", children: "If you cannot scan the QR code, you can manually add this account to your authenticator app using this code:" }),
    /* @__PURE__ */ jsx("div", { className: "p-3", children: /* @__PURE__ */ jsx(
      "pre",
      {
        className: "whitespace-pre-wrap break-all text-sm",
        "aria-label": "One-time Password URI",
        children: data.otpUri
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Once you've added the account, enter the code from your authenticator app below. Once you enable 2FA, you will need to enter a code from your authenticator app every time you log in or perform important actions. Do not lose access to your authenticator app, or you will lose access to your account." }),
    /* @__PURE__ */ jsx("div", { className: "flex w-full max-w-xs flex-col justify-center gap-4", children: /* @__PURE__ */ jsxs(Form, { method: "POST", ...getFormProps(form), className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
        OTPField,
        {
          labelProps: {
            htmlFor: fields.code.id,
            children: "Code"
          },
          inputProps: {
            ...getInputProps(fields.code, { type: "text" }),
            autoFocus: true,
            autoComplete: "one-time-code"
          },
          errors: fields.code.errors
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: /* @__PURE__ */ jsx(ErrorList, { id: form.errorId, errors: form.errors }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            status: pendingIntent === "verify" ? "pending" : lastSubmissionIntent === "verify" ? form.status ?? "idle" : "idle",
            type: "submit",
            name: "intent",
            value: "verify",
            children: "Submit"
          }
        ),
        /* @__PURE__ */ jsx(
          StatusButton,
          {
            className: "w-full",
            variant: "secondary",
            status: pendingIntent === "cancel" ? "pending" : lastSubmissionIntent === "cancel" ? form.status ?? "idle" : "idle",
            type: "submit",
            name: "intent",
            value: "cancel",
            disabled: isPending,
            children: "Cancel"
          }
        )
      ] })
    ] }) })
  ] }) });
}
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: TwoFactorRoute$1,
  handle: handle$1,
  loader: loader$7,
  twoFAVerifyVerificationType
}, Symbol.toStringTag, { value: "Module" }));
const handle = {
  getSitemapEntries: () => null
};
async function loader$6({ request }) {
  const userId = await requireUserId(request);
  const verification = await prisma.verification.findUnique({
    where: { target_type: { type: twoFAVerificationType, target: userId } },
    select: { id: true }
  });
  return json({ is2FAEnabled: Boolean(verification) });
}
async function action$1({ request }) {
  const userId = await requireUserId(request);
  const { otp: _otp, ...config } = generateTOTP();
  const verificationData = {
    ...config,
    type: twoFAVerifyVerificationType,
    target: userId
  };
  await prisma.verification.upsert({
    where: {
      target_type: { target: userId, type: twoFAVerifyVerificationType }
    },
    create: verificationData,
    update: verificationData
  });
  return redirect$1("/settings/profile/two-factor/verify");
}
function TwoFactorRoute() {
  const data = useLoaderData();
  const enable2FAFetcher = useFetcher();
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: data.is2FAEnabled ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg", children: /* @__PURE__ */ jsx(Icon, { name: "check", children: "You have enabled two-factor authentication." }) }),
    /* @__PURE__ */ jsx(Link, { to: "disable", children: /* @__PURE__ */ jsx(Icon, { name: "lock-open-1", children: "Disable 2FA" }) })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Icon, { name: "lock-open-1", children: "You have not enabled two-factor authentication yet." }) }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
      "Two factor authentication adds an extra layer of security to your account. You will need to enter a code from an authenticator app like",
      " ",
      /* @__PURE__ */ jsx("a", { className: "underline", href: "https://1password.com/", children: "1Password" }),
      " ",
      "to log in."
    ] }),
    /* @__PURE__ */ jsx(enable2FAFetcher.Form, { method: "POST", children: /* @__PURE__ */ jsx(
      StatusButton,
      {
        type: "submit",
        name: "intent",
        value: "enable",
        status: enable2FAFetcher.state === "loading" ? "pending" : "idle",
        className: "mx-auto",
        children: "Enable 2FA"
      }
    ) })
  ] }) });
}
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: TwoFactorRoute,
  handle,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const transactionAPI = {
  buyStock: async function(businessId, amount, token) {
    try {
      const response = await api.request({
        url: `/trade/buyShare`,
        method: "POST",
        data: {
          businessId,
          price: amount,
          token
        }
      });
      return response;
    } catch (error) {
      toast$1.error("You have insufficient funds to buy this stock");
      throw error;
    }
  },
  sellStock: async function(businessId, amount, token) {
    const response = await api.request({
      url: `/trade/sellShare`,
      method: "POST",
      data: {
        businessId,
        price: amount,
        token
      }
    });
    return response;
  },
  sendPayment: async function(amount, token, redirectURL) {
    const response = await api.request({
      url: `/payment/sendPayment`,
      method: "POST",
      data: {
        amount,
        token,
        redirectURL
      }
    });
    return response;
  },
  addToWatchlist: async function(businessId, token) {
    const response = await api.request({
      url: `/users/addToWatchlist`,
      method: "POST",
      data: {
        businessId,
        token
      }
    });
    return response;
  },
  removeFromWatchlist: async function(businessId, token) {
    const response = await api.request({
      url: `/users/removeFromWatchlist`,
      method: "POST",
      data: {
        businessId,
        token
      }
    });
    return response;
  },
  //Withdraw Payment
  withdrawFunds: async function(amount, token) {
    const response = await api.request({
      url: `/users/withdrawFunds`,
      method: "POST",
      data: {
        amount,
        token
      }
    });
    return response;
  },
  /*------------------- Receipts -------------------*/
  //Upload Receipt
  uploadReceipt: async function(businessId, fileUrl, sessionToken) {
    const response = await api.request({
      url: `/trade/saveReceipt`,
      method: "POST",
      data: {
        businessId,
        receiptUrl: fileUrl,
        sessionToken
      }
    });
    return response;
  },
  //Get Receipts
  getReceipts: async function(businessId) {
    const response = await api.request({
      url: `/trade/getReceipts`,
      method: "GET"
    });
    return response.data;
  },
  //Delete Receipt
  deleteReceipt: async function(receiptId) {
    const response = await api.request({
      url: `/trade/deleteReceipt`,
      method: "POST",
      data: {
        receiptId
      }
    });
    return response;
  },
  //Process Receipt
  processReceipt: async function(receiptId, amount) {
    const response = await api.request({
      url: `/trade/processReceipt`,
      method: "POST",
      data: {
        receiptId,
        amount
      }
    });
    return response;
  }
};
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip$1,
  Legend,
  Filler
);
const options = {
  responsive: true,
  tension: 0.3
  // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
};
const loader$5 = async ({ params, request }) => {
  const { id } = params;
  const business = await generalAPI.getPublicCompany(id);
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const ownerPermissions = await userAPI.getUserOwnedStocks(session, id);
    if (ownerPermissions) {
      return json({ business, token: session, ownerPermissions });
    } else {
      return json({ business });
    }
  } else {
    return json({ business });
  }
};
const meta = ({ data }) => {
  if (!data || !data.business) {
    return [];
  }
  const { business } = data;
  return [
    { title: `Co-Owners: ${business.name}` },
    { property: "og:title", content: `Co-Owners: ${business.name}` },
    { property: "og:description", content: `${business.name} co-owners page` },
    { property: "og:image", content: business.logo },
    { property: "og:url", content: `https://co-owners.ca/stocks/${business.id}` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Co-Owners: ${business.name}` },
    { name: "twitter:description", content: `${business.name} co-owners page` },
    { name: "twitter:image", content: business.logo },
    { name: "twitter:url", content: `https://co-owners.ca/stocks/${business.id}` }
  ];
};
function BusinessDetails$1() {
  const { business, token, ownerPermissions } = useLoaderData();
  const googleMapsLink = `https://www.google.com/maps?q=${business.coordinates[1]},${business.coordinates[0]}`;
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const navigate = useNavigate();
  const data = {
    labels: business.valuation.map((entry2) => format(new Date(entry2.valDate), "MMM yyyy")),
    datasets: [
      {
        label: "Max Current Price",
        data: business.valuation.map((entry2) => entry2.maxPricePerShare),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: {
          target: "origin",
          // 3. Set the fill options
          above: "rgba(255, 0, 0, 0.3)"
        },
        tension: 0.4
        // Smooth out the lines
      }
    ]
  };
  const handleBuyClick = (ownerPermissions2) => {
    const buyLink = new URLSearchParams({
      type: "Buy",
      businessId: business.id,
      balance: ownerPermissions2.balance.toString()
    }).toString();
    if (isLoggedIn) {
      if (!ownerPermissions2.buy) {
        toast$1.error("You already own this stock already, maximum ownership is one stock per business.");
        return;
      } else {
        navigate(`/transact?${buyLink}`);
      }
    } else {
      console.log("User is not logged in. Redirect to login.");
    }
  };
  const handleSellClick = async (ownerPermissions2) => {
    const sellLink = new URLSearchParams({
      type: "Sell",
      businessId: business.id,
      balance: ownerPermissions2.balance.toString()
    }).toString();
    if (isLoggedIn) {
      if (!ownerPermissions2.sell) {
        toast$1.error("You do not have any shares to sell.");
        console.log("User does not have permission to sell.");
        return;
      } else {
        console.log("User is logged in. Proceed with Sell action.");
        navigate(`/transact?${sellLink}`);
      }
    } else {
      console.log("User is not logged in. Redirect to login.");
    }
  };
  const handleWatchlistClick = async (ownerPermissions2) => {
    if (isLoggedIn) {
      const response = await transactionAPI.addToWatchlist(business.id, token);
      if (response.status === 200) {
        toast$1.success("Business added to watchlist.");
        setTimeout(() => {
          window.location.reload();
        }, 2e3);
      } else {
        toast$1.error("Error adding business to watchlist.");
      }
    }
  };
  const removeWatchlistClick = async (ownerPermissions2) => {
    if (isLoggedIn) {
      const response = await transactionAPI.removeFromWatchlist(business.id, token);
      if (response.status === 200) {
        toast$1.success("Business removed from watchlist.");
        setTimeout(() => {
          window.location.reload();
        }, 2e3);
      } else {
        toast$1.error("Error removing business from watchlist.");
      }
    }
  };
  const googleMapsPanel = () => /* @__PURE__ */ jsx("div", { className: "bg-gray-400", children: /* @__PURE__ */ jsx("div", { className: "p-4 lg:w-3/4 sm:w-full mx-auto", children: /* @__PURE__ */ jsx("a", { href: googleMapsLink, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(LoadScript, { googleMapsApiKey: "AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A", children: /* @__PURE__ */ jsx(
    GoogleMap,
    {
      mapContainerStyle: { width: "100%", height: "30vh", borderRadius: "1rem" },
      center: { lat: business.coordinates[1], lng: business.coordinates[0] },
      zoom: 15,
      children: /* @__PURE__ */ jsx(
        Marker,
        {
          position: { lat: business.coordinates[1], lng: business.coordinates[0] }
        },
        business.id
      )
    }
  ) }) }) }) });
  const buttonPanel = (ownerPermissions2) => /* @__PURE__ */ jsxs("div", { className: "p-4 w-full sm:w-3/4 mx-auto flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:gap-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions2 && ownerPermissions2.buy ? "bg-green-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`,
        onClick: (e) => handleBuyClick(ownerPermissions2),
        disabled: !ownerPermissions2 || !ownerPermissions2.buy,
        children: "Buy"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions2 && ownerPermissions2.sell ? "bg-red-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`,
        onClick: (e) => handleSellClick(ownerPermissions2),
        disabled: !ownerPermissions2 || !ownerPermissions2.sell,
        children: "Sell"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions2 && !ownerPermissions2.watchlist ? "bg-blue-500 text-white" : "bg-red-500 text-white"}`,
        onClick: ownerPermissions2 && !ownerPermissions2.watchlist ? () => handleWatchlistClick() : () => removeWatchlistClick(),
        disabled: !ownerPermissions2,
        children: !ownerPermissions2 || !ownerPermissions2.watchlist ? "Add to Watchlist" : "Remove from Watchlist"
      }
    )
  ] });
  const graph = () => /* @__PURE__ */ jsxs("div", { className: "p-2 lg:p-4 w-full lg:w-3/4 mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-center lg:text-left", children: "Valuation" }),
    /* @__PURE__ */ jsx(Line, { data })
  ] });
  const orderTable = () => /* @__PURE__ */ jsx("div", { className: "bg-blue-400", children: /* @__PURE__ */ jsx("div", { className: "p-4 w-full sm:w-3/4 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 text-center lg:text-left", children: "Sell Orders" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Price" }),
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: business.sellOrders.map((order, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-2 px-4 border-b", children: [
            "$",
            order.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: new Date(order.tradeDate).toLocaleDateString() })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 text-center lg:text-left", children: "Buy Orders" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Price" }),
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: business.buyOrders.map((order, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-2 px-4 border-b", children: [
            "$",
            order.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: new Date(order.tradeDate).toLocaleDateString() })
        ] }, index)) })
      ] })
    ] })
  ] }) }) });
  const ImageCarousel = () => {
    const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    return /* @__PURE__ */ jsx("div", { className: "embla", children: /* @__PURE__ */ jsx("div", { className: "embla__viewport", ref: viewportRef, children: /* @__PURE__ */ jsx("div", { className: "embla__container", children: business.imageAssets.map((image, index) => /* @__PURE__ */ jsx("div", { className: "embla__slide", children: /* @__PURE__ */ jsx("div", { className: "embla__slide__number", children: /* @__PURE__ */ jsx("img", { src: image.imagePath, alt: business.name }) }) }, index)) }) }) });
  };
  const uploadLink = new URLSearchParams({
    businessName: business.name,
    logoUrl: business.logo,
    businessId: business.id
  }).toString();
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { children: [
      googleMapsPanel(),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-3/4 mx-auto p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-start flex-col justify-between items-center mb-4", children: /* @__PURE__ */ jsx("img", { src: business.logo, alt: `${business.name} Logo`, className: "w-16 h-16 object-contain mb-2 sm:mb-0" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:items-start", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold sm:text-left", children: business.name }),
          /* @__PURE__ */ jsx("p", { className: "sm:text-left", children: business.location })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mt-5", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-semibold", children: [
            "$",
            business.maxPricePerShare.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxs("p", { className: `text-lg ${business.growthPercentage >= 0 ? "text-green-500 " : "text-red-500"}`, children: [
            business.growthPercentage >= 0 ? "+" : "",
            business.growthPercentage.toFixed(2),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex mt-4 justify-center", children: /* @__PURE__ */ jsx(Link, { to: `/upload?${uploadLink}`, children: /* @__PURE__ */ jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Upload Reciept" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(ImageCarousel, {}),
      graph(),
      buttonPanel(ownerPermissions),
      orderTable()
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
      googleMapsPanel(),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-3/4 mx-auto p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between items-center mb-4", children: /* @__PURE__ */ jsx("img", { src: business.logo, alt: `${business.name} Logo`, className: "w-16 h-16 object-contain mb-2" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: business.name }),
            /* @__PURE__ */ jsx("p", { className: "text-left", children: business.location })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-3xl font-semibold", children: [
              "$",
              business.maxPricePerShare.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxs("p", { className: `text-lg ${business.growthPercentage >= 0 ? "text-green-500 " : "text-red-500"}`, children: [
              business.growthPercentage >= 0 ? "+" : "",
              business.growthPercentage.toFixed(2),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Link, { to: `/upload?${uploadLink}`, children: /* @__PURE__ */ jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Upload Reciept" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(ImageCarousel, {}),
      graph(),
      buttonPanel(ownerPermissions),
      orderTable()
    ] });
  }
}
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BusinessDetails$1,
  loader: loader$5,
  meta,
  options
}, Symbol.toStringTag, { value: "Module" }));
const defaultCoordinates$1 = { lat: 52.1505506, lng: -106.7468104 };
function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation(defaultCoordinates$1);
        }
      );
    } else {
      setUserLocation(defaultCoordinates$1);
    }
  }, []);
  return userLocation;
}
const defaultCoordinates = { lat: 52.1505506, lng: -106.7468104 };
function Stocks() {
  const [businesses, setBusinesses] = useState(null);
  const navigate = useNavigate$1();
  const userLocation = useUserLocation();
  const handleMarkerClick = useCallback((id) => {
    navigate(`/stocks/${id}`);
  }, [navigate]);
  useEffect(() => {
    if (userLocation) {
      generalAPI.getLocalCompanies(userLocation.lat, userLocation.lng).then((data) => {
        const transformedData = data.map((business) => ({
          id: business._id,
          name: business.name,
          coordinates: business.coordinates
        }));
        setBusinesses(transformedData);
      });
    }
  }, [userLocation]);
  if (!businesses) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx(
      RingLoader,
      {
        color: "#000080",
        loading: true,
        size: 100,
        "aria-label": "Loading Maps"
      }
    ) });
  } else {
    return /* @__PURE__ */ jsx(LoadScript, { googleMapsApiKey: "AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A", children: /* @__PURE__ */ jsx(
      GoogleMap,
      {
        mapContainerStyle: { width: "100%", height: "100vh" },
        center: userLocation || defaultCoordinates,
        zoom: 10,
        children: businesses.map((business) => /* @__PURE__ */ jsx(
          Marker,
          {
            position: { lat: business.coordinates.coordinates[1], lng: business.coordinates.coordinates[0] },
            onClick: () => handleMarkerClick(business.id)
          },
          business.id
        ))
      }
    ) });
  }
}
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Stocks,
  defaultCoordinates
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request }) => {
  const url = new URL(request.url);
  const businessId = url.searchParams.get("businessId");
  const amount = url.searchParams.get("amount");
  const balance = url.searchParams.get("balance");
  const token = url.searchParams.get("token");
  const redirect2 = url.searchParams.get("redirect");
  const type = url.searchParams.get("type") ? url.searchParams.get("type") : null;
  const stripeKey = process.env.STRIPE_PUBLIC_KEY;
  return json({ businessId, amount, balance, token, redirect: redirect2, stripeKey, type });
};
const CheckoutForm = ({ amount, balance, token, redirectURL, type }) => {
  const [amountState, setAmountState] = useState(Number(amount).toFixed(2));
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    if (type === "withdraw") {
      if (balance < Number(amountState)) {
        toast$1.error("Not enough funds to withdraw.");
        setLoading(false);
        return;
      }
      try {
        const response = await transactionAPI.withdrawFunds(amountState, token, redirectURL);
        if (response.status === 200) {
          toast$1.success("Your funds have been withdrawn successfully.");
          navigate(redirectURL);
        }
      } catch (error) {
        console.error("Error creating Checkout Session:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await transactionAPI.sendPayment(amountState, token, redirectURL);
        if (response.status === 200) {
          const session = response.data;
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id
          });
        }
      } catch (error) {
        console.error("Error creating Checkout Session:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const calculateProcessingAmount = (amount2) => {
    return amount2 * 0.029 + 0.3;
  };
  const calculateFinalAmount = (amount2) => {
    return amount2 - calculateProcessingAmount(amount2);
  };
  const processingAmount = calculateProcessingAmount(Number(amountState));
  const finalAmount = calculateFinalAmount(Number(amountState));
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md mx-auto mt-8 shadow-2xl rounded-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-100 text-blue-800 p-4 rounded-t-lg text-center flex items-center justify-center space-x-2", children: [
      /* @__PURE__ */ jsx("img", { src: "https://stripe.com/img/v3/home/twitter.png", alt: "Stripe Logo", className: "h-6" }),
      /* @__PURE__ */ jsx("span", { children: "Payment processing powered by Stripe" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center space-y-4 bg-white p-6 rounded-b-lg shadow-md", children: [
      balance !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "balance", className: "mt-5 text-md font-semibold", children: "Account Balance" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg", children: [
          "$",
          balance.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { htmlFor: "amount", className: "mt-5 text-xl font-semibold", children: [
        type === null || type === "deposit" ? "Deposit" : "Withdraw",
        " Amount"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "$" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: amountState,
            onChange: (e) => setAmountState(e.target.value),
            id: "amount",
            type: "number",
            placeholder: "Enter amount",
            className: "py-2 px-4 rounded-xl text-xl",
            step: "0.01",
            min: "1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-md text-red-500", children: [
          "Stripe Fee: $",
          processingAmount.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl", children: [
          "Final ",
          type === null || type === "deposit" ? "Deposit" : "Withdraw",
          " Amount: $",
          finalAmount.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: `bg-blue-500 text-white py-4 px-10 rounded-xl text-2xl mb-5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`,
          disabled: !stripe || loading,
          children: loading ? "Processing..." : type === null || type === "deposit" ? "Deposit" : "Withdraw"
        }
      )
    ] })
  ] });
};
function DepositPage() {
  const { businessId, amount, balance, token, redirect: redirect2, stripeKey, type } = useLoaderData();
  const stripePromise = loadStripe(stripeKey);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    businessId && /* @__PURE__ */ jsx("div", { className: "bg-red-500 text-white text-center p-4 mb-4", children: "Not enough funds to purchase stock, please make a deposit." }),
    /* @__PURE__ */ jsx(Elements, { stripe: stripePromise, children: /* @__PURE__ */ jsx("div", { className: "p-4 w-3/4 mx-auto flex justify-center", children: /* @__PURE__ */ jsx(CheckoutForm, { amount: Number(amount), balance: Number(balance), token, redirectURL: redirect2, type }) }) })
  ] });
}
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DepositPage,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request }) => {
  const url = new URL(request.url);
  const businessId = url.searchParams.get("businessId");
  const transactionType = url.searchParams.get("type");
  const balance = url.searchParams.get("balance");
  const message = url.searchParams.get("message");
  const business = await generalAPI.getPublicCompany(businessId);
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    if (message === "deposit") {
      return json({ business, transactionType, balance, token: session, message: "Deposit Successful" });
    } else {
      return json({ business, transactionType, balance, token: session });
    }
  } else {
    return json({ business, transactionType });
  }
};
function BusinessDetails() {
  const { business, transactionType, balance, token, message } = useLoaderData();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const navigate = useNavigate();
  if (message) {
    toast$1.success("Deposit Successful");
  }
  const handleBuyClick = async (buyPrice) => {
    if (isLoggedIn) {
      try {
        const response = await transactionAPI.buyStock(business.id, buyPrice, token);
        if (response && response.status === 200) {
          toast$1.success("Your buy order has been placed or completed successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        const buyLink = new URLSearchParams({
          type: "Buy",
          businessId: business.id,
          balance,
          message: "deposit"
        }).toString();
        const stripeFee = Math.ceil((buyPrice * 0.029 + 0.3) * 100) / 100;
        const adminFee = 0.1;
        const totalFee = Math.ceil((buyPrice + stripeFee + adminFee) * 100) / 100;
        const redirectUrlParms = new URLSearchParams({
          amount: totalFee.toFixed(2).toString(),
          businessId: business.id,
          balance,
          token,
          redirect: `/transact?${buyLink}`
        }).toString();
        const redirectUrl = "/stripe?" + redirectUrlParms;
        navigate(redirectUrl);
        throw error;
      }
    } else {
      toast$1.success("You must be logged in to buy stock");
      navigate("/login");
    }
  };
  const handleSellClick = async (sellPrice) => {
    if (isLoggedIn) {
      const response = await transactionAPI.sellStock(business.id, sellPrice, token);
      if (response.status === 200) {
        toast$1.success("Your sell order has been placed or completed successfully");
        navigate("/dashboard");
      }
    } else {
      toast$1.success("You must be logged in to sell your stock");
      navigate("/login");
    }
  };
  const ButtonPanel = ({ transactionType: transactionType2, balance: balance2 }) => {
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const handleBuySubmit = async (event) => {
      event.preventDefault();
      if (typeof buyPrice === "number" && buyPrice > business.maxPricePerShare) {
        toast$1.error("Your buy price cannot exceed the maximum allowed price per share");
      } else if (typeof buyPrice === "number" && buyPrice > 0) {
        const isConfirmed = window.confirm(`Are you sure you want to buy at $${sellPrice}?`);
        if (isConfirmed) {
          try {
            await handleBuyClick(buyPrice);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    const handleSellSubmit = async (event) => {
      event.preventDefault();
      if (typeof sellPrice === "number" && sellPrice > business.maxPricePerShare) {
        toast$1.error("Your sell price cannot exceed the maximum allowed price per share");
      } else if (typeof sellPrice === "number" && sellPrice > 0) {
        const isConfirmed = window.confirm(`Are you sure you want to sell at $${sellPrice}?`);
        if (isConfirmed) {
          try {
            await handleSellClick(sellPrice);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    const handlePriceChange = (setter) => (event) => {
      const value = event.target.value;
      if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
        setter(Number(value));
      }
    };
    if (transactionType2 === "Buy") {
      return /* @__PURE__ */ jsx("div", { className: "p-4 w-full sm:w-3/4 lg:w-1/4 mx-auto flex justify-center shadow-2xl mt-3 mb-3 rounded-xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleBuySubmit, className: "flex flex-col items-center space-y-4", children: [
        balance2 !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "balance", className: "text-md font-semibold", children: "Account Balance" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg", children: [
            "$",
            Number(balance2).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx("label", { htmlFor: "buyPrice", className: "text-xl font-semibold", children: "Buy Price" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: "$" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: buyPrice,
              onChange: handlePriceChange(setBuyPrice),
              placeholder: "Enter buy price",
              className: "py-2 px-4 rounded-xl text-xl",
              step: "0.01"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-md text-right w-full", children: "Transaction Fee: $0.10" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xl text-right w-full", children: [
          "Buy Price:",
          /* @__PURE__ */ jsxs("span", { className: "text-2xl text-blue-600", children: [
            " $",
            (buyPrice ? buyPrice + 0.1 : 0).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "bg-green-500 text-white py-4 px-10 rounded-xl text-2xl w-full",
            children: "Buy"
          }
        )
      ] }) });
    } else {
      return /* @__PURE__ */ jsx("div", { className: "p-4 w-full sm:w-3/4 lg:w-1/4 mx-auto flex justify-center shadow-2xl mt-3 mb-3 rounded-xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSellSubmit, className: "flex flex-col items-center space-y-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "sellPrice", className: "text-xl font-semibold", children: "Sell Price" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: "$" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: sellPrice,
              onChange: handlePriceChange(setSellPrice),
              placeholder: "Enter sell price",
              className: "py-2 px-4 rounded-xl text-xl",
              step: "0.01"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-md text-left w-full", children: "Transaction Fee: $0.10" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xl text-left w-full", children: [
          "Sale Revenue:",
          /* @__PURE__ */ jsxs("span", { className: "text-2xl text-blue-600", children: [
            " $",
            (sellPrice ? sellPrice - 0.1 : 0).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "bg-red-500 text-white py-4 px-10 rounded-xl text-2xl w-full",
            children: "Sell"
          }
        )
      ] }) });
    }
  };
  const orderTable = () => /* @__PURE__ */ jsx("div", { className: "bg-blue-400", children: /* @__PURE__ */ jsx("div", { className: "p-4 w-full sm:w-3/4 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 text-center lg:text-left", children: "Sell Orders" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Price" }),
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: business.sellOrders.map((order, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-2 px-4 border-b", children: [
            "$",
            order.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: new Date(order.tradeDate).toLocaleDateString() })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3 text-center lg:text-left", children: "Buy Orders" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Price" }),
          /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b text-left", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: business.buyOrders.map((order, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "py-2 px-4 border-b", children: [
            "$",
            order.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b", children: new Date(order.tradeDate).toLocaleDateString() })
        ] }, index)) })
      ] })
    ] })
  ] }) }) });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: isMobile ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-3/4 mx-auto p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-start flex-col justify-between items-center mb-4", children: /* @__PURE__ */ jsx("img", { src: business.logo, alt: `${business.name} Logo`, className: "w-16 h-16 object-contain mb-2 sm:mb-0" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:items-start", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold sm:text-left", children: business.name }),
        /* @__PURE__ */ jsx("p", { className: "sm:text-left", children: business.location })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center mt-5", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-3xl font-semibold", children: [
          "$",
          business.maxPricePerShare.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxs("p", { className: `text-lg ${business.growthPercentage >= 0 ? "text-green-500 " : "text-red-500"}`, children: [
          business.growthPercentage >= 0 ? "+" : "",
          business.growthPercentage.toFixed(2),
          "%"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-3/4 mx-auto p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between items-center mb-4", children: /* @__PURE__ */ jsx("img", { src: business.logo, alt: `${business.name} Logo`, className: "w-16 h-16 object-contain mb-2" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: business.name }),
          /* @__PURE__ */ jsx("p", { children: business.location })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-semibold", children: [
            "$",
            business.maxPricePerShare.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxs("p", { className: `text-lg ${business.growthPercentage >= 0 ? "text-green-500 " : "text-red-500"}`, children: [
            business.growthPercentage >= 0 ? "+" : "",
            business.growthPercentage.toFixed(2),
            "%"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ButtonPanel, { transactionType, balance: balance ? Number(balance) : null }),
    orderTable()
  ] });
}
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BusinessDetails,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const storage$1 = new Storage();
const bucketName$1 = "receipts_sk";
const loader$2 = async ({ request }) => {
  const url = new URL(request.url);
  const businessName = url.searchParams.get("businessName");
  const logoUrl = url.searchParams.get("logoUrl");
  const businessId = url.searchParams.get("businessId");
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  if (authSession) {
    const session = authSession.get(sessionKey);
    return { businessName, logoUrl, businessId, session };
  } else {
    return { businessName, logoUrl, businessId };
  }
};
const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("image");
  const id = formData.get("id");
  const businessName = formData.get("businessname");
  const session = formData.get("session");
  if (!file || typeof file === "string" || !id) {
    return json({ error: "No file uploaded or missing ID" }, { status: 400 });
  }
  try {
    const originalFileName = file.name;
    const date = /* @__PURE__ */ new Date();
    const unixDate = date.getTime();
    const file_extension = file.name.split(".").pop();
    const fileName = `${originalFileName}_${unixDate}.${file_extension}`;
    const fileUpload = storage$1.bucket(bucketName$1).file(fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await new Promise((resolve, reject) => {
      const blobStream = fileUpload.createWriteStream({
        resumable: false,
        gzip: true
      });
      blobStream.on("finish", resolve).on("error", reject).end(buffer);
    });
    const upload = await transactionAPI.uploadReceipt(id, `https://storage.googleapis.com/${bucketName$1}/${fileName}`, session);
    return redirectWithToast(
      `/stocks/${id}`,
      {
        title: "Upload Successful",
        description: `Thank you for uploading your receipt for ${businessName}.`
      }
    );
  } catch (error) {
    console.error("Failed to upload image:", error);
    return json({ error: "Failed to upload image" }, { status: 500 });
  }
};
function Upload() {
  const { businessName, logoUrl, businessId, session } = useLoaderData();
  const actionData = useActionData();
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-md", children: [
    /* @__PURE__ */ jsx("img", { src: logoUrl, alt: `${businessName} Logo`, className: "w-24 h-24 object-contain mb-4 mx-auto" }),
    /* @__PURE__ */ jsxs("h1", { className: "text-xl sm:text-2xl font-bold mb-4 text-center", children: [
      "Upload Receipt for ",
      businessName
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "post", encType: "multipart/form-data", className: "space-y-4", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: businessId }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "businessname", value: businessName }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "session", value: session }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "image", className: "block text-sm font-medium text-gray-700 text-center sm:text-left", children: "Choose an image or pdf of the receipt" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            name: "image",
            id: "image",
            className: "mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
          children: "Upload"
        }
      )
    ] }),
    (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("p", { className: "mt-4 text-red-500 text-sm text-center", children: actionData.error })
  ] }) });
}
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Upload,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const storage = new Storage();
const bucketName = "receipts_sk";
const loader$1 = async ({ request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2 && user2.role === "admin") {
      try {
        const receipts = await transactionAPI.getReceipts();
        const signedReceipts = await Promise.all(
          receipts.receipts.map(async (receipt) => {
            const fileName = path.basename(receipt.receiptUrl);
            const file = storage.bucket(bucketName).file(fileName);
            const [url] = await file.getSignedUrl({
              action: "read",
              expires: Date.now() + 1e3 * 60 * 60
              // 1 hour
            });
            console.log(url);
            return {
              ...receipt,
              signedUrl: url
            };
          })
        );
        return json({ signedReceipts });
      } catch (error) {
        console.error("Error fetching files from Google Cloud Storage:", error);
        return json({ error: "Failed to fetch files" }, { status: 500 });
      }
    } else {
      return redirect$1("/");
    }
  } else {
    return redirect$1("/");
  }
};
function Receipts() {
  const { signedReceipts } = useLoaderData();
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const handleOpenModal = (receipt) => {
    setSelectedReceipt({ _id: receipt._id, signedUrl: receipt.signedUrl, amount: "" });
  };
  const handleCloseModal = () => {
    setSelectedReceipt(null);
  };
  const handleAmountChange = (event) => {
    if (selectedReceipt) {
      setSelectedReceipt({ ...selectedReceipt, amount: event.target.value });
    }
  };
  const handleSave = async () => {
    console.log("Saved amount:", selectedReceipt == null ? void 0 : selectedReceipt.amount);
    console.log("Receipt ID:", selectedReceipt == null ? void 0 : selectedReceipt._id);
    await transactionAPI.processReceipt(selectedReceipt == null ? void 0 : selectedReceipt._id, selectedReceipt == null ? void 0 : selectedReceipt.amount);
    handleCloseModal();
    window.location.reload();
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4 sm:p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left", children: "Receipts" }),
    signedReceipts && signedReceipts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b border-gray-200", children: "Business Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b border-gray-200", children: "User Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-4 border-b border-gray-200", children: "Receipt URL" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: signedReceipts.map((receipt) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b border-gray-200 text-center", children: receipt.businessName }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b border-gray-200 text-center", children: receipt.userName || "N/A" }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-4 border-b border-gray-200 text-center", children: /* @__PURE__ */ jsx("button", { onClick: () => handleOpenModal({ _id: receipt._id, signedUrl: receipt.signedUrl }), className: "text-blue-500 hover:underline", children: receipt.receiptUrl }) })
      ] }, receipt._id)) })
    ] }) }) : /* @__PURE__ */ jsx("p", { className: "text-center", children: "No receipts found." }),
    selectedReceipt && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
      /* @__PURE__ */ jsx("img", { src: selectedReceipt.signedUrl, alt: "Receipt", className: "mb-4 w-full h-auto" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: selectedReceipt.amount,
          onChange: handleAmountChange,
          placeholder: "Enter amount",
          className: "w-full p-2 border border-gray-300 rounded"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-5 mt-5", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleCloseModal, className: "bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: handleSave, className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600", children: "Save" })
      ] })
    ] }) })
  ] });
}
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Receipts,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ params, request }) => {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  const session = authSession.get(sessionKey);
  if (session) {
    const user2 = await userAPI.checklogintoken(session);
    if (user2) {
      return json({ user: user2, userJoinedDisplay: new Date(user2.createdAt).toLocaleDateString() });
    } else {
      return redirect$1("/");
    }
  } else {
    return redirect$1("/");
  }
};
function ProfileRoute() {
  const { user: user2, userJoinedDisplay } = useLoaderData();
  const loggedInUser = useOptionalUser();
  const isLoggedInUser = user2._id === (loggedInUser == null ? void 0 : loggedInUser._id);
  return /* @__PURE__ */ jsxs("div", { className: "container mb-48 mt-36 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(Spacer, { size: "4xs" }),
    /* @__PURE__ */ jsxs("div", { className: "container flex flex-col items-center rounded-3xl bg-muted p-12", children: [
      /* @__PURE__ */ jsx(Spacer, { size: "sm" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-4", children: /* @__PURE__ */ jsx("h1", { className: "text-center text-h2", children: user2.name }) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-muted-foreground", children: [
          "Joined: ",
          userJoinedDisplay
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl text-center font-bold mb-4", children: "User Statistics" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-center text-lg", children: user2.history.length }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: " Trades Lifetime" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-center text-lg", children: user2.investments.length }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: " Investments Lifetime" })
            ] })
          ] })
        ] }),
        isLoggedInUser ? /* @__PURE__ */ jsx(Form, { action: "/logout", method: "POST", className: "mt-3", children: /* @__PURE__ */ jsx(Button, { type: "submit", variant: "link", size: "pill", children: /* @__PURE__ */ jsx(Icon, { name: "exit", className: "scale-125 max-md:scale-150", children: "Logout" }) }) }) : null,
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", prefetch: "intent", children: "Dashboard" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(
            Link,
            {
              to: {
                pathname: "/settings/profile",
                search: `?id=${user2._id}&username=${user2.username}&name=${user2.name}&email=${user2.email}`
              },
              prefetch: "intent",
              children: "Edit profile"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsx(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: ({ params }) => /* @__PURE__ */ jsxs("p", { children: [
          'No user with the username "',
          params.username,
          '" exists'
        ] })
      }
    }
  );
}
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: ProfileRoute,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CPcp5uTP.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-Dzgre5KE.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js", "/assets/clsx-B-dksMZM.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-tx3aR2qd.js", "/assets/index-BeXw7Xwl.js", "/assets/hoist-non-react-statics.cjs-Bt47ycYn.js", "/assets/honeypot-4ssNBlKD.js", "/assets/error-boundary-r2anonTu.js", "/assets/icon-DNfY9fbA.js", "/assets/MantineThemeProvider-Bs4ALb5h.js", "/assets/button-BOdK6DJc.js", "/assets/index-4Ns2fbOC.js", "/assets/parse-DONhxXj2.js", "/assets/user-DTujC4T9.js", "/assets/performance-DXAzA4Eb.js"], "css": [] }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_-BQxCf8wr.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/error-boundary-r2anonTu.js", "/assets/icon-DNfY9fbA.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_auth+/auth.$provider": { "id": "routes/_auth+/auth.$provider", "parentId": "root", "path": "auth/:provider", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._provider-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_auth+/auth.$provider.callback": { "id": "routes/_auth+/auth.$provider.callback", "parentId": "routes/_auth+/auth.$provider", "path": "callback", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._provider.callback-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_auth+/forgot-password": { "id": "routes/_auth+/forgot-password", "parentId": "root", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/forgot-password-DWppvyQ9.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/honeypot-4ssNBlKD.js", "/assets/error-boundary-r2anonTu.js", "/assets/forms-Dd4gJQEl.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_auth+/login": { "id": "routes/_auth+/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/login-CfJPtQK6.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js", "/assets/honeypot-4ssNBlKD.js", "/assets/error-boundary-r2anonTu.js", "/assets/forms-Dd4gJQEl.js", "/assets/spacer-ByPtYu5l.js", "/assets/connections-ChdVp00A.js", "/assets/user-validation-Bfp_zbB5.js"], "css": [] }, "routes/_auth+/logout": { "id": "routes/_auth+/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_auth+/onboarding": { "id": "routes/_auth+/onboarding", "parentId": "root", "path": "onboarding", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/onboarding-BVxn9TRp.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/honeypot-4ssNBlKD.js", "/assets/forms-Dd4gJQEl.js", "/assets/spacer-ByPtYu5l.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_auth+/onboarding_.$provider": { "id": "routes/_auth+/onboarding_.$provider", "parentId": "root", "path": "onboarding/:provider", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/onboarding_._provider-CwNUcQa8.js", "imports": ["/assets/index-BeXw7Xwl.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/forms-Dd4gJQEl.js", "/assets/spacer-ByPtYu5l.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_auth+/reset-password": { "id": "routes/_auth+/reset-password", "parentId": "root", "path": "reset-password", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/reset-password-CR2TKyxR.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/error-boundary-r2anonTu.js", "/assets/forms-Dd4gJQEl.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_auth+/signup": { "id": "routes/_auth+/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/signup-BxlTwfqC.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js", "/assets/honeypot-4ssNBlKD.js", "/assets/error-boundary-r2anonTu.js", "/assets/forms-Dd4gJQEl.js", "/assets/connections-ChdVp00A.js", "/assets/user-validation-Bfp_zbB5.js"], "css": [] }, "routes/_auth+/verify": { "id": "routes/_auth+/verify", "parentId": "root", "path": "verify", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/verify-5nlsL-2-.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-BeXw7Xwl.js", "/assets/index-tx3aR2qd.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/honeypot-4ssNBlKD.js", "/assets/error-boundary-r2anonTu.js", "/assets/forms-Dd4gJQEl.js", "/assets/spacer-ByPtYu5l.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_marketing+/about": { "id": "routes/_marketing+/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-CpAkKc7a.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js"], "css": [] }, "routes/_marketing+/index": { "id": "routes/_marketing+/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CoB_AXH1.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/index-4Ns2fbOC.js", "/assets/misc-BxwGVpjn.js", "/assets/tooltip-eZifkrgt.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/_marketing+/privacy": { "id": "routes/_marketing+/privacy", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/privacy-DwYth3gC.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js"], "css": [] }, "routes/_marketing+/support": { "id": "routes/_marketing+/support", "parentId": "root", "path": "support", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/support-BatEqENl.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js"], "css": [] }, "routes/_marketing+/tailwind-preset": { "id": "routes/_marketing+/tailwind-preset", "parentId": "root", "path": "tailwind-preset", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tailwind-preset-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_marketing+/tos": { "id": "routes/_marketing+/tos", "parentId": "root", "path": "tos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tos-Od7hh2yD.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js"], "css": [] }, "routes/admin+/createcompany": { "id": "routes/admin+/createcompany", "parentId": "root", "path": "admin/createcompany", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/createcompany-DJNi4Lbc.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/MantineThemeProvider-Bs4ALb5h.js", "/assets/axiosConfig-D8aEX1dT.js", "/assets/components-BulwabtP.js", "/assets/clsx-B-dksMZM.js", "/assets/objectWithoutPropertiesLoose-BjXSgPXB.js"], "css": [] }, "routes/dashboard+/index": { "id": "routes/dashboard+/index", "parentId": "root", "path": "dashboard/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DSJdouNv.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js", "/assets/lib-Le9o1phv.js", "/assets/iconBase-wPjKOFaK.js", "/assets/index-Db_Hr1iE.js"], "css": [] }, "routes/history+/index": { "id": "routes/history+/index", "parentId": "root", "path": "history/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CDDJLHni.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js", "/assets/lib-Le9o1phv.js", "/assets/clsx-B-dksMZM.js", "/assets/hoist-non-react-statics.cjs-Bt47ycYn.js", "/assets/objectWithoutPropertiesLoose-BjXSgPXB.js", "/assets/iconBase-wPjKOFaK.js", "/assets/index-z6ljlrnP.js"], "css": [] }, "routes/leaderboard+/index": { "id": "routes/leaderboard+/index", "parentId": "root", "path": "leaderboard/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cz46xLTP.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js", "/assets/lib-Le9o1phv.js", "/assets/clsx-B-dksMZM.js", "/assets/hoist-non-react-statics.cjs-Bt47ycYn.js", "/assets/objectWithoutPropertiesLoose-BjXSgPXB.js", "/assets/iconBase-wPjKOFaK.js", "/assets/index-z6ljlrnP.js"], "css": [] }, "routes/me": { "id": "routes/me", "parentId": "root", "path": "me", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/me-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/resources+/_seo+/robots[.]txt": { "id": "routes/resources+/_seo+/robots[.]txt", "parentId": "root", "path": "resources/robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/resources+/_seo+/sitemap[.]xml": { "id": "routes/resources+/_seo+/sitemap[.]xml", "parentId": "root", "path": "resources/sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/resources+/download-user-data": { "id": "routes/resources+/download-user-data", "parentId": "root", "path": "resources/download-user-data", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/download-user-data-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/resources+/theme-switch": { "id": "routes/resources+/theme-switch", "parentId": "root", "path": "resources/theme-switch", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/theme-switch-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/send": { "id": "routes/send", "parentId": "root", "path": "send", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/send-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/settings+/profile": { "id": "routes/settings+/profile", "parentId": "root", "path": "settings/profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile-BCUEDV2r.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/index-BeXw7Xwl.js", "/assets/spacer-ByPtYu5l.js", "/assets/icon-DNfY9fbA.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/settings+/profile.change-email": { "id": "routes/settings+/profile.change-email", "parentId": "routes/settings+/profile", "path": "change-email", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.change-email-Dr3-mRqY.js", "imports": ["/assets/index-BeXw7Xwl.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/forms-Dd4gJQEl.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/settings+/profile.index": { "id": "routes/settings+/profile.index", "parentId": "routes/settings+/profile", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.index-DR5a-C_4.js", "imports": ["/assets/index-BeXw7Xwl.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/forms-Dd4gJQEl.js", "/assets/status-button-trRbWWOl.js", "/assets/user-validation-Bfp_zbB5.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/settings+/profile.two-factor": { "id": "routes/settings+/profile.two-factor", "parentId": "routes/settings+/profile", "path": "two-factor", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.two-factor-EbEypPl0.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/icon-DNfY9fbA.js"], "css": [] }, "routes/settings+/profile.two-factor.disable": { "id": "routes/settings+/profile.two-factor.disable", "parentId": "routes/settings+/profile.two-factor", "path": "disable", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.two-factor.disable-T0QqDVCq.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/index-tx3aR2qd.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/settings+/profile.two-factor.index": { "id": "routes/settings+/profile.two-factor.index", "parentId": "routes/settings+/profile.two-factor", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.two-factor.index-CYaJVWwT.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/index-tx3aR2qd.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/settings+/profile.two-factor.verify": { "id": "routes/settings+/profile.two-factor.verify", "parentId": "routes/settings+/profile.two-factor", "path": "verify", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile.two-factor.verify-D5caUdz5.js", "imports": ["/assets/index-BeXw7Xwl.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-tx3aR2qd.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/parse-DONhxXj2.js", "/assets/index-4Ns2fbOC.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/tooltip-eZifkrgt.js", "/assets/forms-Dd4gJQEl.js", "/assets/status-button-trRbWWOl.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/stocks+/$id": { "id": "routes/stocks+/$id", "parentId": "root", "path": "stocks/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_id-qOYOMbr2.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/axiosConfig-D8aEX1dT.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/esm-CLJVFegd.js", "/assets/index-Db_Hr1iE.js", "/assets/transactionAPI-BMleeZxG.js", "/assets/lib-Le9o1phv.js", "/assets/components-BulwabtP.js"], "css": ["/assets/_id-bOnKuTre.css", "/assets/ReactToastify-BTGsrsBX.css"] }, "routes/stocks+/index": { "id": "routes/stocks+/index", "parentId": "root", "path": "stocks/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DHlrGwop.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/esm-CLJVFegd.js", "/assets/axiosConfig-D8aEX1dT.js"], "css": [] }, "routes/stripe+/index": { "id": "routes/stripe+/index", "parentId": "root", "path": "stripe/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CoS_m26I.js", "imports": ["/assets/axiosConfig-D8aEX1dT.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/clsx-B-dksMZM.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/transactionAPI-BMleeZxG.js", "/assets/components-BulwabtP.js"], "css": ["/assets/ReactToastify-BTGsrsBX.css"] }, "routes/transact+/index": { "id": "routes/transact+/index", "parentId": "root", "path": "transact/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BA_PYQ8o.js", "imports": ["/assets/axiosConfig-D8aEX1dT.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/clsx-B-dksMZM.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/transactionAPI-BMleeZxG.js", "/assets/lib-Le9o1phv.js", "/assets/components-BulwabtP.js"], "css": ["/assets/ReactToastify-BTGsrsBX.css"] }, "routes/upload+/index": { "id": "routes/upload+/index", "parentId": "root", "path": "upload/", "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CX1BUvFA.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/upload+/receipt": { "id": "routes/upload+/receipt", "parentId": "root", "path": "upload/receipt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/receipt-o1H_YFNg.js", "imports": ["/assets/axiosConfig-D8aEX1dT.js", "/assets/jsx-runtime-D2HyDbKh.js", "/assets/clsx-B-dksMZM.js", "/assets/index-PxjvPj8E.js", "/assets/index-Cd_vq22D.js", "/assets/transactionAPI-BMleeZxG.js", "/assets/components-BulwabtP.js"], "css": [] }, "routes/user+/index": { "id": "routes/user+/index", "parentId": "root", "path": "user/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/index-CxnV7UxR.js", "imports": ["/assets/jsx-runtime-D2HyDbKh.js", "/assets/index-PxjvPj8E.js", "/assets/clsx-B-dksMZM.js", "/assets/index-Cd_vq22D.js", "/assets/misc-BxwGVpjn.js", "/assets/exports-BPTENwJi.js", "/assets/index-tx3aR2qd.js", "/assets/components-BulwabtP.js", "/assets/error-boundary-r2anonTu.js", "/assets/spacer-ByPtYu5l.js", "/assets/button-BOdK6DJc.js", "/assets/icon-DNfY9fbA.js", "/assets/user-DTujC4T9.js"], "css": [] } }, "url": "/assets/manifest-be5d49c3.js", "version": "be5d49c3" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_fogOfWar": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_auth+/auth.$provider": {
    id: "routes/_auth+/auth.$provider",
    parentId: "root",
    path: "auth/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_auth+/auth.$provider.callback": {
    id: "routes/_auth+/auth.$provider.callback",
    parentId: "routes/_auth+/auth.$provider",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_auth+/forgot-password": {
    id: "routes/_auth+/forgot-password",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_auth+/login": {
    id: "routes/_auth+/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_auth+/logout": {
    id: "routes/_auth+/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_auth+/onboarding": {
    id: "routes/_auth+/onboarding",
    parentId: "root",
    path: "onboarding",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_auth+/onboarding_.$provider": {
    id: "routes/_auth+/onboarding_.$provider",
    parentId: "root",
    path: "onboarding/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_auth+/reset-password": {
    id: "routes/_auth+/reset-password",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_auth+/signup": {
    id: "routes/_auth+/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_auth+/verify": {
    id: "routes/_auth+/verify",
    parentId: "root",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_marketing+/about": {
    id: "routes/_marketing+/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_marketing+/index": {
    id: "routes/_marketing+/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_marketing+/privacy": {
    id: "routes/_marketing+/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_marketing+/support": {
    id: "routes/_marketing+/support",
    parentId: "root",
    path: "support",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_marketing+/tailwind-preset": {
    id: "routes/_marketing+/tailwind-preset",
    parentId: "root",
    path: "tailwind-preset",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_marketing+/tos": {
    id: "routes/_marketing+/tos",
    parentId: "root",
    path: "tos",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/admin+/createcompany": {
    id: "routes/admin+/createcompany",
    parentId: "root",
    path: "admin/createcompany",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/dashboard+/index": {
    id: "routes/dashboard+/index",
    parentId: "root",
    path: "dashboard/",
    index: true,
    caseSensitive: void 0,
    module: route19
  },
  "routes/history+/index": {
    id: "routes/history+/index",
    parentId: "root",
    path: "history/",
    index: true,
    caseSensitive: void 0,
    module: route20
  },
  "routes/leaderboard+/index": {
    id: "routes/leaderboard+/index",
    parentId: "root",
    path: "leaderboard/",
    index: true,
    caseSensitive: void 0,
    module: route21
  },
  "routes/me": {
    id: "routes/me",
    parentId: "root",
    path: "me",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/resources+/_seo+/robots[.]txt": {
    id: "routes/resources+/_seo+/robots[.]txt",
    parentId: "root",
    path: "resources/robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/resources+/_seo+/sitemap[.]xml": {
    id: "routes/resources+/_seo+/sitemap[.]xml",
    parentId: "root",
    path: "resources/sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/resources+/download-user-data": {
    id: "routes/resources+/download-user-data",
    parentId: "root",
    path: "resources/download-user-data",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/resources+/theme-switch": {
    id: "routes/resources+/theme-switch",
    parentId: "root",
    path: "resources/theme-switch",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/send": {
    id: "routes/send",
    parentId: "root",
    path: "send",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/settings+/profile": {
    id: "routes/settings+/profile",
    parentId: "root",
    path: "settings/profile",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/settings+/profile.change-email": {
    id: "routes/settings+/profile.change-email",
    parentId: "routes/settings+/profile",
    path: "change-email",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/settings+/profile.index": {
    id: "routes/settings+/profile.index",
    parentId: "routes/settings+/profile",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route30
  },
  "routes/settings+/profile.two-factor": {
    id: "routes/settings+/profile.two-factor",
    parentId: "routes/settings+/profile",
    path: "two-factor",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/settings+/profile.two-factor.disable": {
    id: "routes/settings+/profile.two-factor.disable",
    parentId: "routes/settings+/profile.two-factor",
    path: "disable",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/settings+/profile.two-factor.index": {
    id: "routes/settings+/profile.two-factor.index",
    parentId: "routes/settings+/profile.two-factor",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route33
  },
  "routes/settings+/profile.two-factor.verify": {
    id: "routes/settings+/profile.two-factor.verify",
    parentId: "routes/settings+/profile.two-factor",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/stocks+/$id": {
    id: "routes/stocks+/$id",
    parentId: "root",
    path: "stocks/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/stocks+/index": {
    id: "routes/stocks+/index",
    parentId: "root",
    path: "stocks/",
    index: true,
    caseSensitive: void 0,
    module: route36
  },
  "routes/stripe+/index": {
    id: "routes/stripe+/index",
    parentId: "root",
    path: "stripe/",
    index: true,
    caseSensitive: void 0,
    module: route37
  },
  "routes/transact+/index": {
    id: "routes/transact+/index",
    parentId: "root",
    path: "transact/",
    index: true,
    caseSensitive: void 0,
    module: route38
  },
  "routes/upload+/index": {
    id: "routes/upload+/index",
    parentId: "root",
    path: "upload/",
    index: true,
    caseSensitive: void 0,
    module: route39
  },
  "routes/upload+/receipt": {
    id: "routes/upload+/receipt",
    parentId: "root",
    path: "upload/receipt",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/user+/index": {
    id: "routes/user+/index",
    parentId: "root",
    path: "user/",
    index: true,
    caseSensitive: void 0,
    module: route41
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
