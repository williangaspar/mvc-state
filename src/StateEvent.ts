import { Watch, Emit, Unwatch } from "./IStorage";

export class StateEvent {
    public watch: Watch;
    public unWatch: Unwatch;
    public emit: Emit;
}
