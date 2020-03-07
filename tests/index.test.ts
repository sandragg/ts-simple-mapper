import MapperUtils, { ObjectMapper, Mapper } from "../src";

class TestSource {
	constructor(
		 readonly a: number,
		 readonly b: string,
		 readonly c: boolean,
		 readonly d: number[]
	) {}
}

class TestDestination {
	constructor(
		readonly c: boolean,
		readonly d: number[],
		readonly e: number,
		readonly f: string,
		readonly g: string[]
	) {}
}

const source = new TestSource(1, "one", true, [1, 11, 111]);

test("Use undefined mapper", () => {
	expect(MapperUtils.get(TestSource, TestDestination)?.map(source)).toBeUndefined();
});

test("Create mapper", () => {
	expect(MapperUtils.create(TestSource, TestSource).apply()).toBeInstanceOf(ObjectMapper);
});

test("Get mapper", () => {
	MapperUtils.create(TestSource, TestSource).apply();
	expect(MapperUtils.get(TestSource, TestSource)).toBeInstanceOf(ObjectMapper);
});

test("Map objects of the same type", () => {
    MapperUtils.create(TestSource, TestSource).apply();
	expect(MapperUtils.get(TestSource, TestSource)?.map(source)).toBeInstanceOf(TestSource);
	expect(MapperUtils.get(TestSource, TestSource)?.map(source)).toEqual(source);
	expect(Mapper(TestSource, TestSource)?.call(null, source)).toEqual(source);
});

test("Map objects of the different types", () => {
	MapperUtils.create(TestSource, TestDestination)
		.ignore({
		 	e: true,
			f: true,
			g: true
		})
		.apply();
	const dest = new (TestDestination as any)(source.c, source.d);

	expect(MapperUtils.get(TestSource, TestDestination)?.map(source)).toBeInstanceOf(TestDestination);
	expect(MapperUtils.get(TestSource, TestDestination)?.map(source)).toEqual(dest);
	expect(Mapper(TestSource, TestDestination)?.call(null, source)).toEqual(dest);

});

test("Map objects of the different types", () => {
	MapperUtils.create(TestSource, TestDestination)
		.ignore({
		 	e: true
		})
		.ignore({
			f: true
		})
		.ignore({
			g: true
		})
		.apply();
	const dest = new (TestDestination as any)(source.c, source.d);

	expect(MapperUtils.get(TestSource, TestDestination)?.map(source)).toBeInstanceOf(TestDestination);
	expect(MapperUtils.get(TestSource, TestDestination)?.map(source)).toEqual(dest);
	expect(Mapper(TestSource, TestDestination)?.call(null, source)).toEqual(dest);
});

