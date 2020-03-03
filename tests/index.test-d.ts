// @ts-nocheck
import { expectType } from "tsd";
import Mapper, { ObjectMapper } from "../src";

class TestSource {
	public a: number;
	public b: string;
	public c: boolean;
	public d: number[];
}

class TestDestination {
	public c: boolean;
	public d: number[];
	public e: number;
	public f: string;
	public g: string[];
}

class TestDestination_2 {
	public a: number;
	public b: number;
	public c: number[];
	public d: number[];
}


/* Valid mapper */
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

expectType<ObjectMapper<
	TestSource,
	TestSource,
	TestSource
>>(
	Mapper.create(TestSource, TestSource).apply()
);


/* Properties mismatch */
expectType<never>(
Mapper.create(TestSource, TestDestination)
	.ignore({
		e: true,
		f: true
	})
	.apply()
);

expectType<never>(
	Mapper.create(TestSource, TestDestination).apply()
);

expectType<never>(
	Mapper.create(TestSource, TestDestination_2).apply()
);


/* Ignore unknown property */
expectType<ObjectMapper<
	TestSource,
	TestDestination,
	Pick<Pick<TestDestination, "c" | "d" | "g">, never>
>>(
Mapper.create(TestSource, TestDestination)
	.ignore({
		e: true,
		f: true
	})
	.ignore({
		a: true
	})
	.apply()
);

/* Re-ignore the same property */
expectType<ObjectMapper<
	TestSource,
	TestDestination,
	Pick<Pick<TestDestination, "c">, never>
>>(
Mapper.create(TestSource, TestDestination)
	.ignore({
		d: true,
		e: true,
		f: true,
		g: true
	})
	.ignore({
		d: true
	})
	.apply()
);
