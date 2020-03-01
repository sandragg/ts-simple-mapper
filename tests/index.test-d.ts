// @ts-nocheck
import { expectType } from "tsd";
import Mapper, { ObjectMapper } from "../src";

class TestSource {
	public a: any;
	public b: any;
	public c: any;
	public d: any;
}

class TestDestination {
	public c: any;
	public d: any;
	public e: any;
	public f: any;
	public g: any;
}

expectType<ObjectMapper<
	TestSource,
	TestDestination,
	Pick<Pick<TestDestination, "c" | "d" | "g">, "c" | "d">
>>(
Mapper.create(TestSource, TestDestination)
	.ignore({
		e: true,
		f: true
	})
	.ignore({
		g: true
	})
	.apply()
);

expectType<never>(
Mapper.create(TestSource, TestDestination)
	.ignore({
		e: true,
		f: true
	})
	.apply()
);
