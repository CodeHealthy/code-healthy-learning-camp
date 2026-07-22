export type FunctionPhase =
    | "define"
    | "call"
    | "bind"
    | "execute"
    | "return"
    | "resume";

export interface FunctionExecutionStep {
    id: FunctionPhase;
    title: string;
    shortTitle: string;
    description: string;
    activeLines: number[];
    callSiteState: "waiting" | "paused" | "resumed";
    frameVisible: boolean;
    parametersVisible: boolean;
    localVisible: boolean;
    returnVisible: boolean;
    outputVisible: boolean;
}

export interface FunctionScenario {
    price: number;
    quantity: number;
}

export function getFunctionResult({ price, quantity }: FunctionScenario) {
    return price * quantity;
}

export function createFunctionExecutionSteps(
    scenario: FunctionScenario,
): FunctionExecutionStep[] {
    const result = getFunctionResult(scenario);

    return [
        {
            id: "define",
            title: "Define the reusable instructions",
            shortTitle: "Define",
            description:
                "JavaScript creates the calculateTotal function. Its body is ready, but it does not run until the function is called.",
            activeLines: [1, 2, 3, 4],
            callSiteState: "waiting",
            frameVisible: false,
            parametersVisible: false,
            localVisible: false,
            returnVisible: false,
            outputVisible: false,
        },
        {
            id: "call",
            title: "Call the function with arguments",
            shortTitle: "Call",
            description: `Execution reaches calculateTotal(${scenario.price}, ${scenario.quantity}). The values ${scenario.price} and ${scenario.quantity} are arguments supplied by the call site.`,
            activeLines: [6],
            callSiteState: "paused",
            frameVisible: false,
            parametersVisible: false,
            localVisible: false,
            returnVisible: false,
            outputVisible: false,
        },
        {
            id: "bind",
            title: "Create a call frame and bind parameters",
            shortTitle: "Bind",
            description: `A temporary function call frame is added to the call stack. price receives ${scenario.price}, and quantity receives ${scenario.quantity}.`,
            activeLines: [1],
            callSiteState: "paused",
            frameVisible: true,
            parametersVisible: true,
            localVisible: false,
            returnVisible: false,
            outputVisible: false,
        },
        {
            id: "execute",
            title: "Execute inside local scope",
            shortTitle: "Execute",
            description: `The function multiplies its parameters and stores ${result} in the local variable subtotal. This variable belongs only to this call.`,
            activeLines: [2],
            callSiteState: "paused",
            frameVisible: true,
            parametersVisible: true,
            localVisible: true,
            returnVisible: false,
            outputVisible: false,
        },
        {
            id: "return",
            title: "Return the result to the caller",
            shortTitle: "Return",
            description: `return sends ${result} back to the exact place where the call was waiting. The function call frame can now be removed.`,
            activeLines: [3],
            callSiteState: "paused",
            frameVisible: true,
            parametersVisible: true,
            localVisible: true,
            returnVisible: true,
            outputVisible: false,
        },
        {
            id: "resume",
            title: "Resume the caller with the returned value",
            shortTitle: "Resume",
            description: `The call expression is replaced by ${result}. orderTotal receives that value, and the next line displays it. The function's local scope no longer exists.`,
            activeLines: [6, 7],
            callSiteState: "resumed",
            frameVisible: false,
            parametersVisible: false,
            localVisible: false,
            returnVisible: true,
            outputVisible: true,
        },
    ];
}

export function getFunctionCodeLines({ price, quantity }: FunctionScenario) {
    return [
        "function calculateTotal(price, quantity) {",
        "  const subtotal = price * quantity;",
        "  return subtotal;",
        "}",
        "",
        `const orderTotal = calculateTotal(${price}, ${quantity});`,
        "console.log(orderTotal);",
    ];
}
