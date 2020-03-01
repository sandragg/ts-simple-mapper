import { ObjectMapper } from "./object-mapper";
import { ClassConstructor } from "./interfaces";

const mappers = new Map<string, ObjectMapper<any, any>>();

function getMapperUniqueKey(Source: Function, Destination: Function) {
	return  Source.name.concat(Destination.name);
}

export function create<Src, Dest>(Source: ClassConstructor<Src>, Destination: ClassConstructor<Dest>) {
	const key = getMapperUniqueKey(Source, Destination);
	const mapper = new ObjectMapper(Source, Destination);
	mappers.set(key, mapper);
	return mapper;
}

export function get<Src, Dest>(
	Source: ClassConstructor<Src>,
	Destination: ClassConstructor<Dest>
): ObjectMapper<Src, Dest> | undefined {
	const key = getMapperUniqueKey(Source, Destination);
	return mappers.get(key);
}

export function map<Src, Dest>(Source: ClassConstructor<Src>, Destination: ClassConstructor<Dest>) {
	const mapper = get(Source, Destination);
	return mapper?.map;
}

export default map;
