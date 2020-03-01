import { ClassConstructor } from "./interfaces";

export class ObjectMapper<Src, Dest, Result = Dest> {
	private ignoredProps: Set<string> | null = null;
	private readonly Source: ClassConstructor<Src>;
	private readonly Destination: ClassConstructor<Dest>;

	constructor(
		Source: ClassConstructor<Src>,
		Destination: ClassConstructor<Dest>
	) {
		this.Source = Source;
		this.Destination = Destination;
		this.map = this.map.bind(this);
	}

	public ignore<K extends keyof Result>(
		ignored: Record<K, true>
	): ObjectMapper<Src, Dest, Omit<Result, keyof Record<K, true>>> {
		if (!this.ignoredProps) {
			this.ignoredProps = new Set();
		}
		Object.keys(ignored).forEach(key => this.ignoredProps?.add(key));
		// @ts-ignore
		return this;
	}

	public apply(this: Src extends Result? ObjectMapper<Src, Dest, Result> : never) {}

	public map(obj: Src): Dest {
		const destination = new this.Destination();
		Object.keys(destination).forEach(key => {
			if (!this.ignoredProps?.has(key)) {
				destination[key] = obj[key];
			}
		});
		return destination;
	}
}