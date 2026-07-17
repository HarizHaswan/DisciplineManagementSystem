
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Kursus
 * 
 */
export type Kursus = $Result.DefaultSelection<Prisma.$KursusPayload>
/**
 * Model OffenceType
 * 
 */
export type OffenceType = $Result.DefaultSelection<Prisma.$OffenceTypePayload>
/**
 * Model DisciplinaryRecord
 * 
 */
export type DisciplinaryRecord = $Result.DefaultSelection<Prisma.$DisciplinaryRecordPayload>
/**
 * Model WarningLetter
 * 
 */
export type WarningLetter = $Result.DefaultSelection<Prisma.$WarningLetterPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.kursus`: Exposes CRUD operations for the **Kursus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kursuses
    * const kursuses = await prisma.kursus.findMany()
    * ```
    */
  get kursus(): Prisma.KursusDelegate<ExtArgs>;

  /**
   * `prisma.offenceType`: Exposes CRUD operations for the **OffenceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OffenceTypes
    * const offenceTypes = await prisma.offenceType.findMany()
    * ```
    */
  get offenceType(): Prisma.OffenceTypeDelegate<ExtArgs>;

  /**
   * `prisma.disciplinaryRecord`: Exposes CRUD operations for the **DisciplinaryRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DisciplinaryRecords
    * const disciplinaryRecords = await prisma.disciplinaryRecord.findMany()
    * ```
    */
  get disciplinaryRecord(): Prisma.DisciplinaryRecordDelegate<ExtArgs>;

  /**
   * `prisma.warningLetter`: Exposes CRUD operations for the **WarningLetter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WarningLetters
    * const warningLetters = await prisma.warningLetter.findMany()
    * ```
    */
  get warningLetter(): Prisma.WarningLetterDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Student: 'Student',
    Kursus: 'Kursus',
    OffenceType: 'OffenceType',
    DisciplinaryRecord: 'DisciplinaryRecord',
    WarningLetter: 'WarningLetter'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "student" | "kursus" | "offenceType" | "disciplinaryRecord" | "warningLetter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Kursus: {
        payload: Prisma.$KursusPayload<ExtArgs>
        fields: Prisma.KursusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KursusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KursusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          findFirst: {
            args: Prisma.KursusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KursusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          findMany: {
            args: Prisma.KursusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>[]
          }
          create: {
            args: Prisma.KursusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          createMany: {
            args: Prisma.KursusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.KursusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          update: {
            args: Prisma.KursusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          deleteMany: {
            args: Prisma.KursusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KursusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KursusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KursusPayload>
          }
          aggregate: {
            args: Prisma.KursusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKursus>
          }
          groupBy: {
            args: Prisma.KursusGroupByArgs<ExtArgs>
            result: $Utils.Optional<KursusGroupByOutputType>[]
          }
          count: {
            args: Prisma.KursusCountArgs<ExtArgs>
            result: $Utils.Optional<KursusCountAggregateOutputType> | number
          }
        }
      }
      OffenceType: {
        payload: Prisma.$OffenceTypePayload<ExtArgs>
        fields: Prisma.OffenceTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OffenceTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OffenceTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          findFirst: {
            args: Prisma.OffenceTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OffenceTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          findMany: {
            args: Prisma.OffenceTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>[]
          }
          create: {
            args: Prisma.OffenceTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          createMany: {
            args: Prisma.OffenceTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OffenceTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          update: {
            args: Prisma.OffenceTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          deleteMany: {
            args: Prisma.OffenceTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OffenceTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OffenceTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OffenceTypePayload>
          }
          aggregate: {
            args: Prisma.OffenceTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffenceType>
          }
          groupBy: {
            args: Prisma.OffenceTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OffenceTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OffenceTypeCountArgs<ExtArgs>
            result: $Utils.Optional<OffenceTypeCountAggregateOutputType> | number
          }
        }
      }
      DisciplinaryRecord: {
        payload: Prisma.$DisciplinaryRecordPayload<ExtArgs>
        fields: Prisma.DisciplinaryRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisciplinaryRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisciplinaryRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          findFirst: {
            args: Prisma.DisciplinaryRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisciplinaryRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          findMany: {
            args: Prisma.DisciplinaryRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>[]
          }
          create: {
            args: Prisma.DisciplinaryRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          createMany: {
            args: Prisma.DisciplinaryRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DisciplinaryRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          update: {
            args: Prisma.DisciplinaryRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          deleteMany: {
            args: Prisma.DisciplinaryRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisciplinaryRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DisciplinaryRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaryRecordPayload>
          }
          aggregate: {
            args: Prisma.DisciplinaryRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisciplinaryRecord>
          }
          groupBy: {
            args: Prisma.DisciplinaryRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaryRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisciplinaryRecordCountArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaryRecordCountAggregateOutputType> | number
          }
        }
      }
      WarningLetter: {
        payload: Prisma.$WarningLetterPayload<ExtArgs>
        fields: Prisma.WarningLetterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WarningLetterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WarningLetterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          findFirst: {
            args: Prisma.WarningLetterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WarningLetterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          findMany: {
            args: Prisma.WarningLetterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>[]
          }
          create: {
            args: Prisma.WarningLetterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          createMany: {
            args: Prisma.WarningLetterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WarningLetterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          update: {
            args: Prisma.WarningLetterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          deleteMany: {
            args: Prisma.WarningLetterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WarningLetterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WarningLetterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarningLetterPayload>
          }
          aggregate: {
            args: Prisma.WarningLetterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWarningLetter>
          }
          groupBy: {
            args: Prisma.WarningLetterGroupByArgs<ExtArgs>
            result: $Utils.Optional<WarningLetterGroupByOutputType>[]
          }
          count: {
            args: Prisma.WarningLetterCountArgs<ExtArgs>
            result: $Utils.Optional<WarningLetterCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    records: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | UserCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaryRecordWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    records: number
    warningLetters: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | StudentCountOutputTypeCountRecordsArgs
    warningLetters?: boolean | StudentCountOutputTypeCountWarningLettersArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaryRecordWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountWarningLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WarningLetterWhereInput
  }


  /**
   * Count Type KursusCountOutputType
   */

  export type KursusCountOutputType = {
    students: number
  }

  export type KursusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | KursusCountOutputTypeCountStudentsArgs
  }

  // Custom InputTypes
  /**
   * KursusCountOutputType without action
   */
  export type KursusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KursusCountOutputType
     */
    select?: KursusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KursusCountOutputType without action
   */
  export type KursusCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }


  /**
   * Count Type OffenceTypeCountOutputType
   */

  export type OffenceTypeCountOutputType = {
    records: number
  }

  export type OffenceTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | OffenceTypeCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * OffenceTypeCountOutputType without action
   */
  export type OffenceTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceTypeCountOutputType
     */
    select?: OffenceTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OffenceTypeCountOutputType without action
   */
  export type OffenceTypeCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaryRecordWhereInput
  }


  /**
   * Count Type WarningLetterCountOutputType
   */

  export type WarningLetterCountOutputType = {
    records: number
  }

  export type WarningLetterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | WarningLetterCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * WarningLetterCountOutputType without action
   */
  export type WarningLetterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetterCountOutputType
     */
    select?: WarningLetterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WarningLetterCountOutputType without action
   */
  export type WarningLetterCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaryRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    name: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    records?: boolean | User$recordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | User$recordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      records: Prisma.$DisciplinaryRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      name: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    records<T extends User$recordsArgs<ExtArgs> = {}>(args?: Subset<T, User$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.records
   */
  export type User$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    where?: DisciplinaryRecordWhereInput
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    cursor?: DisciplinaryRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    kursusId: number | null
    cohort: number | null
    semester: number | null
  }

  export type StudentSumAggregateOutputType = {
    kursusId: number | null
    cohort: number | null
    semester: number | null
  }

  export type StudentMinAggregateOutputType = {
    studentNumber: string | null
    icNumber: string | null
    name: string | null
    email: string | null
    studentPhone: string | null
    kursusId: number | null
    cohort: number | null
    programType: string | null
    semester: number | null
    status: string | null
    parentName: string | null
    parentPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    studentNumber: string | null
    icNumber: string | null
    name: string | null
    email: string | null
    studentPhone: string | null
    kursusId: number | null
    cohort: number | null
    programType: string | null
    semester: number | null
    status: string | null
    parentName: string | null
    parentPhone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    studentNumber: number
    icNumber: number
    name: number
    email: number
    studentPhone: number
    kursusId: number
    cohort: number
    programType: number
    semester: number
    status: number
    parentName: number
    parentPhone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    kursusId?: true
    cohort?: true
    semester?: true
  }

  export type StudentSumAggregateInputType = {
    kursusId?: true
    cohort?: true
    semester?: true
  }

  export type StudentMinAggregateInputType = {
    studentNumber?: true
    icNumber?: true
    name?: true
    email?: true
    studentPhone?: true
    kursusId?: true
    cohort?: true
    programType?: true
    semester?: true
    status?: true
    parentName?: true
    parentPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    studentNumber?: true
    icNumber?: true
    name?: true
    email?: true
    studentPhone?: true
    kursusId?: true
    cohort?: true
    programType?: true
    semester?: true
    status?: true
    parentName?: true
    parentPhone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    studentNumber?: true
    icNumber?: true
    name?: true
    email?: true
    studentPhone?: true
    kursusId?: true
    cohort?: true
    programType?: true
    semester?: true
    status?: true
    parentName?: true
    parentPhone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    studentNumber: string
    icNumber: string
    name: string
    email: string | null
    studentPhone: string | null
    kursusId: number
    cohort: number
    programType: string
    semester: number
    status: string
    parentName: string
    parentPhone: string
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentNumber?: boolean
    icNumber?: boolean
    name?: boolean
    email?: boolean
    studentPhone?: boolean
    kursusId?: boolean
    cohort?: boolean
    programType?: boolean
    semester?: boolean
    status?: boolean
    parentName?: boolean
    parentPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kursus?: boolean | KursusDefaultArgs<ExtArgs>
    records?: boolean | Student$recordsArgs<ExtArgs>
    warningLetters?: boolean | Student$warningLettersArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>


  export type StudentSelectScalar = {
    studentNumber?: boolean
    icNumber?: boolean
    name?: boolean
    email?: boolean
    studentPhone?: boolean
    kursusId?: boolean
    cohort?: boolean
    programType?: boolean
    semester?: boolean
    status?: boolean
    parentName?: boolean
    parentPhone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kursus?: boolean | KursusDefaultArgs<ExtArgs>
    records?: boolean | Student$recordsArgs<ExtArgs>
    warningLetters?: boolean | Student$warningLettersArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      kursus: Prisma.$KursusPayload<ExtArgs>
      records: Prisma.$DisciplinaryRecordPayload<ExtArgs>[]
      warningLetters: Prisma.$WarningLetterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      studentNumber: string
      icNumber: string
      name: string
      email: string | null
      studentPhone: string | null
      kursusId: number
      cohort: number
      programType: string
      semester: number
      status: string
      parentName: string
      parentPhone: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `studentNumber`
     * const studentWithStudentNumberOnly = await prisma.student.findMany({ select: { studentNumber: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kursus<T extends KursusDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KursusDefaultArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    records<T extends Student$recordsArgs<ExtArgs> = {}>(args?: Subset<T, Student$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findMany"> | Null>
    warningLetters<T extends Student$warningLettersArgs<ExtArgs> = {}>(args?: Subset<T, Student$warningLettersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly studentNumber: FieldRef<"Student", 'String'>
    readonly icNumber: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly studentPhone: FieldRef<"Student", 'String'>
    readonly kursusId: FieldRef<"Student", 'Int'>
    readonly cohort: FieldRef<"Student", 'Int'>
    readonly programType: FieldRef<"Student", 'String'>
    readonly semester: FieldRef<"Student", 'Int'>
    readonly status: FieldRef<"Student", 'String'>
    readonly parentName: FieldRef<"Student", 'String'>
    readonly parentPhone: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.records
   */
  export type Student$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    where?: DisciplinaryRecordWhereInput
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    cursor?: DisciplinaryRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * Student.warningLetters
   */
  export type Student$warningLettersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    where?: WarningLetterWhereInput
    orderBy?: WarningLetterOrderByWithRelationInput | WarningLetterOrderByWithRelationInput[]
    cursor?: WarningLetterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WarningLetterScalarFieldEnum | WarningLetterScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Kursus
   */

  export type AggregateKursus = {
    _count: KursusCountAggregateOutputType | null
    _avg: KursusAvgAggregateOutputType | null
    _sum: KursusSumAggregateOutputType | null
    _min: KursusMinAggregateOutputType | null
    _max: KursusMaxAggregateOutputType | null
  }

  export type KursusAvgAggregateOutputType = {
    id: number | null
  }

  export type KursusSumAggregateOutputType = {
    id: number | null
  }

  export type KursusMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
  }

  export type KursusMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
  }

  export type KursusCountAggregateOutputType = {
    id: number
    code: number
    name: number
    _all: number
  }


  export type KursusAvgAggregateInputType = {
    id?: true
  }

  export type KursusSumAggregateInputType = {
    id?: true
  }

  export type KursusMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
  }

  export type KursusMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
  }

  export type KursusCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    _all?: true
  }

  export type KursusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kursus to aggregate.
     */
    where?: KursusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kursuses to fetch.
     */
    orderBy?: KursusOrderByWithRelationInput | KursusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KursusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kursuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kursuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kursuses
    **/
    _count?: true | KursusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KursusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KursusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KursusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KursusMaxAggregateInputType
  }

  export type GetKursusAggregateType<T extends KursusAggregateArgs> = {
        [P in keyof T & keyof AggregateKursus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKursus[P]>
      : GetScalarType<T[P], AggregateKursus[P]>
  }




  export type KursusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KursusWhereInput
    orderBy?: KursusOrderByWithAggregationInput | KursusOrderByWithAggregationInput[]
    by: KursusScalarFieldEnum[] | KursusScalarFieldEnum
    having?: KursusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KursusCountAggregateInputType | true
    _avg?: KursusAvgAggregateInputType
    _sum?: KursusSumAggregateInputType
    _min?: KursusMinAggregateInputType
    _max?: KursusMaxAggregateInputType
  }

  export type KursusGroupByOutputType = {
    id: number
    code: string
    name: string
    _count: KursusCountAggregateOutputType | null
    _avg: KursusAvgAggregateOutputType | null
    _sum: KursusSumAggregateOutputType | null
    _min: KursusMinAggregateOutputType | null
    _max: KursusMaxAggregateOutputType | null
  }

  type GetKursusGroupByPayload<T extends KursusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KursusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KursusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KursusGroupByOutputType[P]>
            : GetScalarType<T[P], KursusGroupByOutputType[P]>
        }
      >
    >


  export type KursusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    students?: boolean | Kursus$studentsArgs<ExtArgs>
    _count?: boolean | KursusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kursus"]>


  export type KursusSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
  }

  export type KursusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | Kursus$studentsArgs<ExtArgs>
    _count?: boolean | KursusCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $KursusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kursus"
    objects: {
      students: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
    }, ExtArgs["result"]["kursus"]>
    composites: {}
  }

  type KursusGetPayload<S extends boolean | null | undefined | KursusDefaultArgs> = $Result.GetResult<Prisma.$KursusPayload, S>

  type KursusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KursusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KursusCountAggregateInputType | true
    }

  export interface KursusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kursus'], meta: { name: 'Kursus' } }
    /**
     * Find zero or one Kursus that matches the filter.
     * @param {KursusFindUniqueArgs} args - Arguments to find a Kursus
     * @example
     * // Get one Kursus
     * const kursus = await prisma.kursus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KursusFindUniqueArgs>(args: SelectSubset<T, KursusFindUniqueArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Kursus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KursusFindUniqueOrThrowArgs} args - Arguments to find a Kursus
     * @example
     * // Get one Kursus
     * const kursus = await prisma.kursus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KursusFindUniqueOrThrowArgs>(args: SelectSubset<T, KursusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Kursus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusFindFirstArgs} args - Arguments to find a Kursus
     * @example
     * // Get one Kursus
     * const kursus = await prisma.kursus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KursusFindFirstArgs>(args?: SelectSubset<T, KursusFindFirstArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Kursus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusFindFirstOrThrowArgs} args - Arguments to find a Kursus
     * @example
     * // Get one Kursus
     * const kursus = await prisma.kursus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KursusFindFirstOrThrowArgs>(args?: SelectSubset<T, KursusFindFirstOrThrowArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Kursuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kursuses
     * const kursuses = await prisma.kursus.findMany()
     * 
     * // Get first 10 Kursuses
     * const kursuses = await prisma.kursus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kursusWithIdOnly = await prisma.kursus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KursusFindManyArgs>(args?: SelectSubset<T, KursusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Kursus.
     * @param {KursusCreateArgs} args - Arguments to create a Kursus.
     * @example
     * // Create one Kursus
     * const Kursus = await prisma.kursus.create({
     *   data: {
     *     // ... data to create a Kursus
     *   }
     * })
     * 
     */
    create<T extends KursusCreateArgs>(args: SelectSubset<T, KursusCreateArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Kursuses.
     * @param {KursusCreateManyArgs} args - Arguments to create many Kursuses.
     * @example
     * // Create many Kursuses
     * const kursus = await prisma.kursus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KursusCreateManyArgs>(args?: SelectSubset<T, KursusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Kursus.
     * @param {KursusDeleteArgs} args - Arguments to delete one Kursus.
     * @example
     * // Delete one Kursus
     * const Kursus = await prisma.kursus.delete({
     *   where: {
     *     // ... filter to delete one Kursus
     *   }
     * })
     * 
     */
    delete<T extends KursusDeleteArgs>(args: SelectSubset<T, KursusDeleteArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Kursus.
     * @param {KursusUpdateArgs} args - Arguments to update one Kursus.
     * @example
     * // Update one Kursus
     * const kursus = await prisma.kursus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KursusUpdateArgs>(args: SelectSubset<T, KursusUpdateArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Kursuses.
     * @param {KursusDeleteManyArgs} args - Arguments to filter Kursuses to delete.
     * @example
     * // Delete a few Kursuses
     * const { count } = await prisma.kursus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KursusDeleteManyArgs>(args?: SelectSubset<T, KursusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kursuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kursuses
     * const kursus = await prisma.kursus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KursusUpdateManyArgs>(args: SelectSubset<T, KursusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Kursus.
     * @param {KursusUpsertArgs} args - Arguments to update or create a Kursus.
     * @example
     * // Update or create a Kursus
     * const kursus = await prisma.kursus.upsert({
     *   create: {
     *     // ... data to create a Kursus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kursus we want to update
     *   }
     * })
     */
    upsert<T extends KursusUpsertArgs>(args: SelectSubset<T, KursusUpsertArgs<ExtArgs>>): Prisma__KursusClient<$Result.GetResult<Prisma.$KursusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Kursuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusCountArgs} args - Arguments to filter Kursuses to count.
     * @example
     * // Count the number of Kursuses
     * const count = await prisma.kursus.count({
     *   where: {
     *     // ... the filter for the Kursuses we want to count
     *   }
     * })
    **/
    count<T extends KursusCountArgs>(
      args?: Subset<T, KursusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KursusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kursus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KursusAggregateArgs>(args: Subset<T, KursusAggregateArgs>): Prisma.PrismaPromise<GetKursusAggregateType<T>>

    /**
     * Group by Kursus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KursusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KursusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KursusGroupByArgs['orderBy'] }
        : { orderBy?: KursusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KursusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKursusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kursus model
   */
  readonly fields: KursusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kursus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KursusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends Kursus$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Kursus$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kursus model
   */ 
  interface KursusFieldRefs {
    readonly id: FieldRef<"Kursus", 'Int'>
    readonly code: FieldRef<"Kursus", 'String'>
    readonly name: FieldRef<"Kursus", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kursus findUnique
   */
  export type KursusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter, which Kursus to fetch.
     */
    where: KursusWhereUniqueInput
  }

  /**
   * Kursus findUniqueOrThrow
   */
  export type KursusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter, which Kursus to fetch.
     */
    where: KursusWhereUniqueInput
  }

  /**
   * Kursus findFirst
   */
  export type KursusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter, which Kursus to fetch.
     */
    where?: KursusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kursuses to fetch.
     */
    orderBy?: KursusOrderByWithRelationInput | KursusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kursuses.
     */
    cursor?: KursusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kursuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kursuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kursuses.
     */
    distinct?: KursusScalarFieldEnum | KursusScalarFieldEnum[]
  }

  /**
   * Kursus findFirstOrThrow
   */
  export type KursusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter, which Kursus to fetch.
     */
    where?: KursusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kursuses to fetch.
     */
    orderBy?: KursusOrderByWithRelationInput | KursusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kursuses.
     */
    cursor?: KursusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kursuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kursuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kursuses.
     */
    distinct?: KursusScalarFieldEnum | KursusScalarFieldEnum[]
  }

  /**
   * Kursus findMany
   */
  export type KursusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter, which Kursuses to fetch.
     */
    where?: KursusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kursuses to fetch.
     */
    orderBy?: KursusOrderByWithRelationInput | KursusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kursuses.
     */
    cursor?: KursusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kursuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kursuses.
     */
    skip?: number
    distinct?: KursusScalarFieldEnum | KursusScalarFieldEnum[]
  }

  /**
   * Kursus create
   */
  export type KursusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * The data needed to create a Kursus.
     */
    data: XOR<KursusCreateInput, KursusUncheckedCreateInput>
  }

  /**
   * Kursus createMany
   */
  export type KursusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kursuses.
     */
    data: KursusCreateManyInput | KursusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kursus update
   */
  export type KursusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * The data needed to update a Kursus.
     */
    data: XOR<KursusUpdateInput, KursusUncheckedUpdateInput>
    /**
     * Choose, which Kursus to update.
     */
    where: KursusWhereUniqueInput
  }

  /**
   * Kursus updateMany
   */
  export type KursusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kursuses.
     */
    data: XOR<KursusUpdateManyMutationInput, KursusUncheckedUpdateManyInput>
    /**
     * Filter which Kursuses to update
     */
    where?: KursusWhereInput
  }

  /**
   * Kursus upsert
   */
  export type KursusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * The filter to search for the Kursus to update in case it exists.
     */
    where: KursusWhereUniqueInput
    /**
     * In case the Kursus found by the `where` argument doesn't exist, create a new Kursus with this data.
     */
    create: XOR<KursusCreateInput, KursusUncheckedCreateInput>
    /**
     * In case the Kursus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KursusUpdateInput, KursusUncheckedUpdateInput>
  }

  /**
   * Kursus delete
   */
  export type KursusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
    /**
     * Filter which Kursus to delete.
     */
    where: KursusWhereUniqueInput
  }

  /**
   * Kursus deleteMany
   */
  export type KursusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kursuses to delete
     */
    where?: KursusWhereInput
  }

  /**
   * Kursus.students
   */
  export type Kursus$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Kursus without action
   */
  export type KursusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kursus
     */
    select?: KursusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KursusInclude<ExtArgs> | null
  }


  /**
   * Model OffenceType
   */

  export type AggregateOffenceType = {
    _count: OffenceTypeCountAggregateOutputType | null
    _avg: OffenceTypeAvgAggregateOutputType | null
    _sum: OffenceTypeSumAggregateOutputType | null
    _min: OffenceTypeMinAggregateOutputType | null
    _max: OffenceTypeMaxAggregateOutputType | null
  }

  export type OffenceTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type OffenceTypeSumAggregateOutputType = {
    id: number | null
  }

  export type OffenceTypeMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    category: string | null
    description: string | null
  }

  export type OffenceTypeMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    category: string | null
    description: string | null
  }

  export type OffenceTypeCountAggregateOutputType = {
    id: number
    code: number
    name: number
    category: number
    description: number
    _all: number
  }


  export type OffenceTypeAvgAggregateInputType = {
    id?: true
  }

  export type OffenceTypeSumAggregateInputType = {
    id?: true
  }

  export type OffenceTypeMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    description?: true
  }

  export type OffenceTypeMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    description?: true
  }

  export type OffenceTypeCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    category?: true
    description?: true
    _all?: true
  }

  export type OffenceTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OffenceType to aggregate.
     */
    where?: OffenceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OffenceTypes to fetch.
     */
    orderBy?: OffenceTypeOrderByWithRelationInput | OffenceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OffenceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OffenceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OffenceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OffenceTypes
    **/
    _count?: true | OffenceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OffenceTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OffenceTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OffenceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OffenceTypeMaxAggregateInputType
  }

  export type GetOffenceTypeAggregateType<T extends OffenceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateOffenceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffenceType[P]>
      : GetScalarType<T[P], AggregateOffenceType[P]>
  }




  export type OffenceTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OffenceTypeWhereInput
    orderBy?: OffenceTypeOrderByWithAggregationInput | OffenceTypeOrderByWithAggregationInput[]
    by: OffenceTypeScalarFieldEnum[] | OffenceTypeScalarFieldEnum
    having?: OffenceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OffenceTypeCountAggregateInputType | true
    _avg?: OffenceTypeAvgAggregateInputType
    _sum?: OffenceTypeSumAggregateInputType
    _min?: OffenceTypeMinAggregateInputType
    _max?: OffenceTypeMaxAggregateInputType
  }

  export type OffenceTypeGroupByOutputType = {
    id: number
    code: string
    name: string
    category: string
    description: string | null
    _count: OffenceTypeCountAggregateOutputType | null
    _avg: OffenceTypeAvgAggregateOutputType | null
    _sum: OffenceTypeSumAggregateOutputType | null
    _min: OffenceTypeMinAggregateOutputType | null
    _max: OffenceTypeMaxAggregateOutputType | null
  }

  type GetOffenceTypeGroupByPayload<T extends OffenceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OffenceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OffenceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OffenceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], OffenceTypeGroupByOutputType[P]>
        }
      >
    >


  export type OffenceTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    records?: boolean | OffenceType$recordsArgs<ExtArgs>
    _count?: boolean | OffenceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offenceType"]>


  export type OffenceTypeSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
  }

  export type OffenceTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | OffenceType$recordsArgs<ExtArgs>
    _count?: boolean | OffenceTypeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OffenceTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OffenceType"
    objects: {
      records: Prisma.$DisciplinaryRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      category: string
      description: string | null
    }, ExtArgs["result"]["offenceType"]>
    composites: {}
  }

  type OffenceTypeGetPayload<S extends boolean | null | undefined | OffenceTypeDefaultArgs> = $Result.GetResult<Prisma.$OffenceTypePayload, S>

  type OffenceTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OffenceTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OffenceTypeCountAggregateInputType | true
    }

  export interface OffenceTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OffenceType'], meta: { name: 'OffenceType' } }
    /**
     * Find zero or one OffenceType that matches the filter.
     * @param {OffenceTypeFindUniqueArgs} args - Arguments to find a OffenceType
     * @example
     * // Get one OffenceType
     * const offenceType = await prisma.offenceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OffenceTypeFindUniqueArgs>(args: SelectSubset<T, OffenceTypeFindUniqueArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OffenceType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OffenceTypeFindUniqueOrThrowArgs} args - Arguments to find a OffenceType
     * @example
     * // Get one OffenceType
     * const offenceType = await prisma.offenceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OffenceTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, OffenceTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OffenceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeFindFirstArgs} args - Arguments to find a OffenceType
     * @example
     * // Get one OffenceType
     * const offenceType = await prisma.offenceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OffenceTypeFindFirstArgs>(args?: SelectSubset<T, OffenceTypeFindFirstArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OffenceType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeFindFirstOrThrowArgs} args - Arguments to find a OffenceType
     * @example
     * // Get one OffenceType
     * const offenceType = await prisma.offenceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OffenceTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, OffenceTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OffenceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OffenceTypes
     * const offenceTypes = await prisma.offenceType.findMany()
     * 
     * // Get first 10 OffenceTypes
     * const offenceTypes = await prisma.offenceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offenceTypeWithIdOnly = await prisma.offenceType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OffenceTypeFindManyArgs>(args?: SelectSubset<T, OffenceTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OffenceType.
     * @param {OffenceTypeCreateArgs} args - Arguments to create a OffenceType.
     * @example
     * // Create one OffenceType
     * const OffenceType = await prisma.offenceType.create({
     *   data: {
     *     // ... data to create a OffenceType
     *   }
     * })
     * 
     */
    create<T extends OffenceTypeCreateArgs>(args: SelectSubset<T, OffenceTypeCreateArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OffenceTypes.
     * @param {OffenceTypeCreateManyArgs} args - Arguments to create many OffenceTypes.
     * @example
     * // Create many OffenceTypes
     * const offenceType = await prisma.offenceType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OffenceTypeCreateManyArgs>(args?: SelectSubset<T, OffenceTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OffenceType.
     * @param {OffenceTypeDeleteArgs} args - Arguments to delete one OffenceType.
     * @example
     * // Delete one OffenceType
     * const OffenceType = await prisma.offenceType.delete({
     *   where: {
     *     // ... filter to delete one OffenceType
     *   }
     * })
     * 
     */
    delete<T extends OffenceTypeDeleteArgs>(args: SelectSubset<T, OffenceTypeDeleteArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OffenceType.
     * @param {OffenceTypeUpdateArgs} args - Arguments to update one OffenceType.
     * @example
     * // Update one OffenceType
     * const offenceType = await prisma.offenceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OffenceTypeUpdateArgs>(args: SelectSubset<T, OffenceTypeUpdateArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OffenceTypes.
     * @param {OffenceTypeDeleteManyArgs} args - Arguments to filter OffenceTypes to delete.
     * @example
     * // Delete a few OffenceTypes
     * const { count } = await prisma.offenceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OffenceTypeDeleteManyArgs>(args?: SelectSubset<T, OffenceTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OffenceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OffenceTypes
     * const offenceType = await prisma.offenceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OffenceTypeUpdateManyArgs>(args: SelectSubset<T, OffenceTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OffenceType.
     * @param {OffenceTypeUpsertArgs} args - Arguments to update or create a OffenceType.
     * @example
     * // Update or create a OffenceType
     * const offenceType = await prisma.offenceType.upsert({
     *   create: {
     *     // ... data to create a OffenceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OffenceType we want to update
     *   }
     * })
     */
    upsert<T extends OffenceTypeUpsertArgs>(args: SelectSubset<T, OffenceTypeUpsertArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OffenceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeCountArgs} args - Arguments to filter OffenceTypes to count.
     * @example
     * // Count the number of OffenceTypes
     * const count = await prisma.offenceType.count({
     *   where: {
     *     // ... the filter for the OffenceTypes we want to count
     *   }
     * })
    **/
    count<T extends OffenceTypeCountArgs>(
      args?: Subset<T, OffenceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OffenceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OffenceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OffenceTypeAggregateArgs>(args: Subset<T, OffenceTypeAggregateArgs>): Prisma.PrismaPromise<GetOffenceTypeAggregateType<T>>

    /**
     * Group by OffenceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OffenceTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OffenceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OffenceTypeGroupByArgs['orderBy'] }
        : { orderBy?: OffenceTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OffenceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOffenceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OffenceType model
   */
  readonly fields: OffenceTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OffenceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OffenceTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    records<T extends OffenceType$recordsArgs<ExtArgs> = {}>(args?: Subset<T, OffenceType$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OffenceType model
   */ 
  interface OffenceTypeFieldRefs {
    readonly id: FieldRef<"OffenceType", 'Int'>
    readonly code: FieldRef<"OffenceType", 'String'>
    readonly name: FieldRef<"OffenceType", 'String'>
    readonly category: FieldRef<"OffenceType", 'String'>
    readonly description: FieldRef<"OffenceType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OffenceType findUnique
   */
  export type OffenceTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter, which OffenceType to fetch.
     */
    where: OffenceTypeWhereUniqueInput
  }

  /**
   * OffenceType findUniqueOrThrow
   */
  export type OffenceTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter, which OffenceType to fetch.
     */
    where: OffenceTypeWhereUniqueInput
  }

  /**
   * OffenceType findFirst
   */
  export type OffenceTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter, which OffenceType to fetch.
     */
    where?: OffenceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OffenceTypes to fetch.
     */
    orderBy?: OffenceTypeOrderByWithRelationInput | OffenceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OffenceTypes.
     */
    cursor?: OffenceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OffenceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OffenceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OffenceTypes.
     */
    distinct?: OffenceTypeScalarFieldEnum | OffenceTypeScalarFieldEnum[]
  }

  /**
   * OffenceType findFirstOrThrow
   */
  export type OffenceTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter, which OffenceType to fetch.
     */
    where?: OffenceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OffenceTypes to fetch.
     */
    orderBy?: OffenceTypeOrderByWithRelationInput | OffenceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OffenceTypes.
     */
    cursor?: OffenceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OffenceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OffenceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OffenceTypes.
     */
    distinct?: OffenceTypeScalarFieldEnum | OffenceTypeScalarFieldEnum[]
  }

  /**
   * OffenceType findMany
   */
  export type OffenceTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter, which OffenceTypes to fetch.
     */
    where?: OffenceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OffenceTypes to fetch.
     */
    orderBy?: OffenceTypeOrderByWithRelationInput | OffenceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OffenceTypes.
     */
    cursor?: OffenceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OffenceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OffenceTypes.
     */
    skip?: number
    distinct?: OffenceTypeScalarFieldEnum | OffenceTypeScalarFieldEnum[]
  }

  /**
   * OffenceType create
   */
  export type OffenceTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a OffenceType.
     */
    data: XOR<OffenceTypeCreateInput, OffenceTypeUncheckedCreateInput>
  }

  /**
   * OffenceType createMany
   */
  export type OffenceTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OffenceTypes.
     */
    data: OffenceTypeCreateManyInput | OffenceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OffenceType update
   */
  export type OffenceTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a OffenceType.
     */
    data: XOR<OffenceTypeUpdateInput, OffenceTypeUncheckedUpdateInput>
    /**
     * Choose, which OffenceType to update.
     */
    where: OffenceTypeWhereUniqueInput
  }

  /**
   * OffenceType updateMany
   */
  export type OffenceTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OffenceTypes.
     */
    data: XOR<OffenceTypeUpdateManyMutationInput, OffenceTypeUncheckedUpdateManyInput>
    /**
     * Filter which OffenceTypes to update
     */
    where?: OffenceTypeWhereInput
  }

  /**
   * OffenceType upsert
   */
  export type OffenceTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the OffenceType to update in case it exists.
     */
    where: OffenceTypeWhereUniqueInput
    /**
     * In case the OffenceType found by the `where` argument doesn't exist, create a new OffenceType with this data.
     */
    create: XOR<OffenceTypeCreateInput, OffenceTypeUncheckedCreateInput>
    /**
     * In case the OffenceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OffenceTypeUpdateInput, OffenceTypeUncheckedUpdateInput>
  }

  /**
   * OffenceType delete
   */
  export type OffenceTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
    /**
     * Filter which OffenceType to delete.
     */
    where: OffenceTypeWhereUniqueInput
  }

  /**
   * OffenceType deleteMany
   */
  export type OffenceTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OffenceTypes to delete
     */
    where?: OffenceTypeWhereInput
  }

  /**
   * OffenceType.records
   */
  export type OffenceType$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    where?: DisciplinaryRecordWhereInput
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    cursor?: DisciplinaryRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * OffenceType without action
   */
  export type OffenceTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OffenceType
     */
    select?: OffenceTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OffenceTypeInclude<ExtArgs> | null
  }


  /**
   * Model DisciplinaryRecord
   */

  export type AggregateDisciplinaryRecord = {
    _count: DisciplinaryRecordCountAggregateOutputType | null
    _avg: DisciplinaryRecordAvgAggregateOutputType | null
    _sum: DisciplinaryRecordSumAggregateOutputType | null
    _min: DisciplinaryRecordMinAggregateOutputType | null
    _max: DisciplinaryRecordMaxAggregateOutputType | null
  }

  export type DisciplinaryRecordAvgAggregateOutputType = {
    id: number | null
    offenceTypeId: number | null
    teacherId: number | null
    warningLetterId: number | null
  }

  export type DisciplinaryRecordSumAggregateOutputType = {
    id: number | null
    offenceTypeId: number | null
    teacherId: number | null
    warningLetterId: number | null
  }

  export type DisciplinaryRecordMinAggregateOutputType = {
    id: number | null
    studentId: string | null
    offenceTypeId: number | null
    teacherId: number | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    warningLetterId: number | null
  }

  export type DisciplinaryRecordMaxAggregateOutputType = {
    id: number | null
    studentId: string | null
    offenceTypeId: number | null
    teacherId: number | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    warningLetterId: number | null
  }

  export type DisciplinaryRecordCountAggregateOutputType = {
    id: number
    studentId: number
    offenceTypeId: number
    teacherId: number
    date: number
    description: number
    createdAt: number
    warningLetterId: number
    _all: number
  }


  export type DisciplinaryRecordAvgAggregateInputType = {
    id?: true
    offenceTypeId?: true
    teacherId?: true
    warningLetterId?: true
  }

  export type DisciplinaryRecordSumAggregateInputType = {
    id?: true
    offenceTypeId?: true
    teacherId?: true
    warningLetterId?: true
  }

  export type DisciplinaryRecordMinAggregateInputType = {
    id?: true
    studentId?: true
    offenceTypeId?: true
    teacherId?: true
    date?: true
    description?: true
    createdAt?: true
    warningLetterId?: true
  }

  export type DisciplinaryRecordMaxAggregateInputType = {
    id?: true
    studentId?: true
    offenceTypeId?: true
    teacherId?: true
    date?: true
    description?: true
    createdAt?: true
    warningLetterId?: true
  }

  export type DisciplinaryRecordCountAggregateInputType = {
    id?: true
    studentId?: true
    offenceTypeId?: true
    teacherId?: true
    date?: true
    description?: true
    createdAt?: true
    warningLetterId?: true
    _all?: true
  }

  export type DisciplinaryRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DisciplinaryRecord to aggregate.
     */
    where?: DisciplinaryRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisciplinaryRecords to fetch.
     */
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisciplinaryRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisciplinaryRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisciplinaryRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DisciplinaryRecords
    **/
    _count?: true | DisciplinaryRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisciplinaryRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisciplinaryRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisciplinaryRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisciplinaryRecordMaxAggregateInputType
  }

  export type GetDisciplinaryRecordAggregateType<T extends DisciplinaryRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDisciplinaryRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisciplinaryRecord[P]>
      : GetScalarType<T[P], AggregateDisciplinaryRecord[P]>
  }




  export type DisciplinaryRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaryRecordWhereInput
    orderBy?: DisciplinaryRecordOrderByWithAggregationInput | DisciplinaryRecordOrderByWithAggregationInput[]
    by: DisciplinaryRecordScalarFieldEnum[] | DisciplinaryRecordScalarFieldEnum
    having?: DisciplinaryRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisciplinaryRecordCountAggregateInputType | true
    _avg?: DisciplinaryRecordAvgAggregateInputType
    _sum?: DisciplinaryRecordSumAggregateInputType
    _min?: DisciplinaryRecordMinAggregateInputType
    _max?: DisciplinaryRecordMaxAggregateInputType
  }

  export type DisciplinaryRecordGroupByOutputType = {
    id: number
    studentId: string
    offenceTypeId: number
    teacherId: number
    date: Date
    description: string
    createdAt: Date
    warningLetterId: number | null
    _count: DisciplinaryRecordCountAggregateOutputType | null
    _avg: DisciplinaryRecordAvgAggregateOutputType | null
    _sum: DisciplinaryRecordSumAggregateOutputType | null
    _min: DisciplinaryRecordMinAggregateOutputType | null
    _max: DisciplinaryRecordMaxAggregateOutputType | null
  }

  type GetDisciplinaryRecordGroupByPayload<T extends DisciplinaryRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisciplinaryRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisciplinaryRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisciplinaryRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DisciplinaryRecordGroupByOutputType[P]>
        }
      >
    >


  export type DisciplinaryRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    offenceTypeId?: boolean
    teacherId?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    warningLetterId?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    offenceType?: boolean | OffenceTypeDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    warningLetter?: boolean | DisciplinaryRecord$warningLetterArgs<ExtArgs>
  }, ExtArgs["result"]["disciplinaryRecord"]>


  export type DisciplinaryRecordSelectScalar = {
    id?: boolean
    studentId?: boolean
    offenceTypeId?: boolean
    teacherId?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    warningLetterId?: boolean
  }

  export type DisciplinaryRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    offenceType?: boolean | OffenceTypeDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
    warningLetter?: boolean | DisciplinaryRecord$warningLetterArgs<ExtArgs>
  }

  export type $DisciplinaryRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DisciplinaryRecord"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      offenceType: Prisma.$OffenceTypePayload<ExtArgs>
      teacher: Prisma.$UserPayload<ExtArgs>
      warningLetter: Prisma.$WarningLetterPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: string
      offenceTypeId: number
      teacherId: number
      date: Date
      description: string
      createdAt: Date
      warningLetterId: number | null
    }, ExtArgs["result"]["disciplinaryRecord"]>
    composites: {}
  }

  type DisciplinaryRecordGetPayload<S extends boolean | null | undefined | DisciplinaryRecordDefaultArgs> = $Result.GetResult<Prisma.$DisciplinaryRecordPayload, S>

  type DisciplinaryRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DisciplinaryRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DisciplinaryRecordCountAggregateInputType | true
    }

  export interface DisciplinaryRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DisciplinaryRecord'], meta: { name: 'DisciplinaryRecord' } }
    /**
     * Find zero or one DisciplinaryRecord that matches the filter.
     * @param {DisciplinaryRecordFindUniqueArgs} args - Arguments to find a DisciplinaryRecord
     * @example
     * // Get one DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisciplinaryRecordFindUniqueArgs>(args: SelectSubset<T, DisciplinaryRecordFindUniqueArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DisciplinaryRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DisciplinaryRecordFindUniqueOrThrowArgs} args - Arguments to find a DisciplinaryRecord
     * @example
     * // Get one DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisciplinaryRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, DisciplinaryRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DisciplinaryRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordFindFirstArgs} args - Arguments to find a DisciplinaryRecord
     * @example
     * // Get one DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisciplinaryRecordFindFirstArgs>(args?: SelectSubset<T, DisciplinaryRecordFindFirstArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DisciplinaryRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordFindFirstOrThrowArgs} args - Arguments to find a DisciplinaryRecord
     * @example
     * // Get one DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisciplinaryRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, DisciplinaryRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DisciplinaryRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DisciplinaryRecords
     * const disciplinaryRecords = await prisma.disciplinaryRecord.findMany()
     * 
     * // Get first 10 DisciplinaryRecords
     * const disciplinaryRecords = await prisma.disciplinaryRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disciplinaryRecordWithIdOnly = await prisma.disciplinaryRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisciplinaryRecordFindManyArgs>(args?: SelectSubset<T, DisciplinaryRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DisciplinaryRecord.
     * @param {DisciplinaryRecordCreateArgs} args - Arguments to create a DisciplinaryRecord.
     * @example
     * // Create one DisciplinaryRecord
     * const DisciplinaryRecord = await prisma.disciplinaryRecord.create({
     *   data: {
     *     // ... data to create a DisciplinaryRecord
     *   }
     * })
     * 
     */
    create<T extends DisciplinaryRecordCreateArgs>(args: SelectSubset<T, DisciplinaryRecordCreateArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DisciplinaryRecords.
     * @param {DisciplinaryRecordCreateManyArgs} args - Arguments to create many DisciplinaryRecords.
     * @example
     * // Create many DisciplinaryRecords
     * const disciplinaryRecord = await prisma.disciplinaryRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisciplinaryRecordCreateManyArgs>(args?: SelectSubset<T, DisciplinaryRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DisciplinaryRecord.
     * @param {DisciplinaryRecordDeleteArgs} args - Arguments to delete one DisciplinaryRecord.
     * @example
     * // Delete one DisciplinaryRecord
     * const DisciplinaryRecord = await prisma.disciplinaryRecord.delete({
     *   where: {
     *     // ... filter to delete one DisciplinaryRecord
     *   }
     * })
     * 
     */
    delete<T extends DisciplinaryRecordDeleteArgs>(args: SelectSubset<T, DisciplinaryRecordDeleteArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DisciplinaryRecord.
     * @param {DisciplinaryRecordUpdateArgs} args - Arguments to update one DisciplinaryRecord.
     * @example
     * // Update one DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisciplinaryRecordUpdateArgs>(args: SelectSubset<T, DisciplinaryRecordUpdateArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DisciplinaryRecords.
     * @param {DisciplinaryRecordDeleteManyArgs} args - Arguments to filter DisciplinaryRecords to delete.
     * @example
     * // Delete a few DisciplinaryRecords
     * const { count } = await prisma.disciplinaryRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisciplinaryRecordDeleteManyArgs>(args?: SelectSubset<T, DisciplinaryRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DisciplinaryRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DisciplinaryRecords
     * const disciplinaryRecord = await prisma.disciplinaryRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisciplinaryRecordUpdateManyArgs>(args: SelectSubset<T, DisciplinaryRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DisciplinaryRecord.
     * @param {DisciplinaryRecordUpsertArgs} args - Arguments to update or create a DisciplinaryRecord.
     * @example
     * // Update or create a DisciplinaryRecord
     * const disciplinaryRecord = await prisma.disciplinaryRecord.upsert({
     *   create: {
     *     // ... data to create a DisciplinaryRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DisciplinaryRecord we want to update
     *   }
     * })
     */
    upsert<T extends DisciplinaryRecordUpsertArgs>(args: SelectSubset<T, DisciplinaryRecordUpsertArgs<ExtArgs>>): Prisma__DisciplinaryRecordClient<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DisciplinaryRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordCountArgs} args - Arguments to filter DisciplinaryRecords to count.
     * @example
     * // Count the number of DisciplinaryRecords
     * const count = await prisma.disciplinaryRecord.count({
     *   where: {
     *     // ... the filter for the DisciplinaryRecords we want to count
     *   }
     * })
    **/
    count<T extends DisciplinaryRecordCountArgs>(
      args?: Subset<T, DisciplinaryRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisciplinaryRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DisciplinaryRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisciplinaryRecordAggregateArgs>(args: Subset<T, DisciplinaryRecordAggregateArgs>): Prisma.PrismaPromise<GetDisciplinaryRecordAggregateType<T>>

    /**
     * Group by DisciplinaryRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaryRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisciplinaryRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisciplinaryRecordGroupByArgs['orderBy'] }
        : { orderBy?: DisciplinaryRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisciplinaryRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinaryRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DisciplinaryRecord model
   */
  readonly fields: DisciplinaryRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DisciplinaryRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisciplinaryRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    offenceType<T extends OffenceTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OffenceTypeDefaultArgs<ExtArgs>>): Prisma__OffenceTypeClient<$Result.GetResult<Prisma.$OffenceTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    warningLetter<T extends DisciplinaryRecord$warningLetterArgs<ExtArgs> = {}>(args?: Subset<T, DisciplinaryRecord$warningLetterArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DisciplinaryRecord model
   */ 
  interface DisciplinaryRecordFieldRefs {
    readonly id: FieldRef<"DisciplinaryRecord", 'Int'>
    readonly studentId: FieldRef<"DisciplinaryRecord", 'String'>
    readonly offenceTypeId: FieldRef<"DisciplinaryRecord", 'Int'>
    readonly teacherId: FieldRef<"DisciplinaryRecord", 'Int'>
    readonly date: FieldRef<"DisciplinaryRecord", 'DateTime'>
    readonly description: FieldRef<"DisciplinaryRecord", 'String'>
    readonly createdAt: FieldRef<"DisciplinaryRecord", 'DateTime'>
    readonly warningLetterId: FieldRef<"DisciplinaryRecord", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DisciplinaryRecord findUnique
   */
  export type DisciplinaryRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisciplinaryRecord to fetch.
     */
    where: DisciplinaryRecordWhereUniqueInput
  }

  /**
   * DisciplinaryRecord findUniqueOrThrow
   */
  export type DisciplinaryRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisciplinaryRecord to fetch.
     */
    where: DisciplinaryRecordWhereUniqueInput
  }

  /**
   * DisciplinaryRecord findFirst
   */
  export type DisciplinaryRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisciplinaryRecord to fetch.
     */
    where?: DisciplinaryRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisciplinaryRecords to fetch.
     */
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DisciplinaryRecords.
     */
    cursor?: DisciplinaryRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisciplinaryRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisciplinaryRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DisciplinaryRecords.
     */
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * DisciplinaryRecord findFirstOrThrow
   */
  export type DisciplinaryRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisciplinaryRecord to fetch.
     */
    where?: DisciplinaryRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisciplinaryRecords to fetch.
     */
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DisciplinaryRecords.
     */
    cursor?: DisciplinaryRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisciplinaryRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisciplinaryRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DisciplinaryRecords.
     */
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * DisciplinaryRecord findMany
   */
  export type DisciplinaryRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter, which DisciplinaryRecords to fetch.
     */
    where?: DisciplinaryRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DisciplinaryRecords to fetch.
     */
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DisciplinaryRecords.
     */
    cursor?: DisciplinaryRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DisciplinaryRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DisciplinaryRecords.
     */
    skip?: number
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * DisciplinaryRecord create
   */
  export type DisciplinaryRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DisciplinaryRecord.
     */
    data: XOR<DisciplinaryRecordCreateInput, DisciplinaryRecordUncheckedCreateInput>
  }

  /**
   * DisciplinaryRecord createMany
   */
  export type DisciplinaryRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DisciplinaryRecords.
     */
    data: DisciplinaryRecordCreateManyInput | DisciplinaryRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DisciplinaryRecord update
   */
  export type DisciplinaryRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DisciplinaryRecord.
     */
    data: XOR<DisciplinaryRecordUpdateInput, DisciplinaryRecordUncheckedUpdateInput>
    /**
     * Choose, which DisciplinaryRecord to update.
     */
    where: DisciplinaryRecordWhereUniqueInput
  }

  /**
   * DisciplinaryRecord updateMany
   */
  export type DisciplinaryRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DisciplinaryRecords.
     */
    data: XOR<DisciplinaryRecordUpdateManyMutationInput, DisciplinaryRecordUncheckedUpdateManyInput>
    /**
     * Filter which DisciplinaryRecords to update
     */
    where?: DisciplinaryRecordWhereInput
  }

  /**
   * DisciplinaryRecord upsert
   */
  export type DisciplinaryRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DisciplinaryRecord to update in case it exists.
     */
    where: DisciplinaryRecordWhereUniqueInput
    /**
     * In case the DisciplinaryRecord found by the `where` argument doesn't exist, create a new DisciplinaryRecord with this data.
     */
    create: XOR<DisciplinaryRecordCreateInput, DisciplinaryRecordUncheckedCreateInput>
    /**
     * In case the DisciplinaryRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisciplinaryRecordUpdateInput, DisciplinaryRecordUncheckedUpdateInput>
  }

  /**
   * DisciplinaryRecord delete
   */
  export type DisciplinaryRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    /**
     * Filter which DisciplinaryRecord to delete.
     */
    where: DisciplinaryRecordWhereUniqueInput
  }

  /**
   * DisciplinaryRecord deleteMany
   */
  export type DisciplinaryRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DisciplinaryRecords to delete
     */
    where?: DisciplinaryRecordWhereInput
  }

  /**
   * DisciplinaryRecord.warningLetter
   */
  export type DisciplinaryRecord$warningLetterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    where?: WarningLetterWhereInput
  }

  /**
   * DisciplinaryRecord without action
   */
  export type DisciplinaryRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
  }


  /**
   * Model WarningLetter
   */

  export type AggregateWarningLetter = {
    _count: WarningLetterCountAggregateOutputType | null
    _avg: WarningLetterAvgAggregateOutputType | null
    _sum: WarningLetterSumAggregateOutputType | null
    _min: WarningLetterMinAggregateOutputType | null
    _max: WarningLetterMaxAggregateOutputType | null
  }

  export type WarningLetterAvgAggregateOutputType = {
    id: number | null
    warningTier: number | null
  }

  export type WarningLetterSumAggregateOutputType = {
    id: number | null
    warningTier: number | null
  }

  export type WarningLetterMinAggregateOutputType = {
    id: number | null
    studentId: string | null
    warningTier: number | null
    issuedDate: Date | null
    status: string | null
    month: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarningLetterMaxAggregateOutputType = {
    id: number | null
    studentId: string | null
    warningTier: number | null
    issuedDate: Date | null
    status: string | null
    month: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WarningLetterCountAggregateOutputType = {
    id: number
    studentId: number
    warningTier: number
    issuedDate: number
    status: number
    month: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WarningLetterAvgAggregateInputType = {
    id?: true
    warningTier?: true
  }

  export type WarningLetterSumAggregateInputType = {
    id?: true
    warningTier?: true
  }

  export type WarningLetterMinAggregateInputType = {
    id?: true
    studentId?: true
    warningTier?: true
    issuedDate?: true
    status?: true
    month?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarningLetterMaxAggregateInputType = {
    id?: true
    studentId?: true
    warningTier?: true
    issuedDate?: true
    status?: true
    month?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WarningLetterCountAggregateInputType = {
    id?: true
    studentId?: true
    warningTier?: true
    issuedDate?: true
    status?: true
    month?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WarningLetterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WarningLetter to aggregate.
     */
    where?: WarningLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WarningLetters to fetch.
     */
    orderBy?: WarningLetterOrderByWithRelationInput | WarningLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WarningLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WarningLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WarningLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WarningLetters
    **/
    _count?: true | WarningLetterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarningLetterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarningLetterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarningLetterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarningLetterMaxAggregateInputType
  }

  export type GetWarningLetterAggregateType<T extends WarningLetterAggregateArgs> = {
        [P in keyof T & keyof AggregateWarningLetter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarningLetter[P]>
      : GetScalarType<T[P], AggregateWarningLetter[P]>
  }




  export type WarningLetterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WarningLetterWhereInput
    orderBy?: WarningLetterOrderByWithAggregationInput | WarningLetterOrderByWithAggregationInput[]
    by: WarningLetterScalarFieldEnum[] | WarningLetterScalarFieldEnum
    having?: WarningLetterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarningLetterCountAggregateInputType | true
    _avg?: WarningLetterAvgAggregateInputType
    _sum?: WarningLetterSumAggregateInputType
    _min?: WarningLetterMinAggregateInputType
    _max?: WarningLetterMaxAggregateInputType
  }

  export type WarningLetterGroupByOutputType = {
    id: number
    studentId: string
    warningTier: number
    issuedDate: Date
    status: string
    month: string
    createdAt: Date
    updatedAt: Date
    _count: WarningLetterCountAggregateOutputType | null
    _avg: WarningLetterAvgAggregateOutputType | null
    _sum: WarningLetterSumAggregateOutputType | null
    _min: WarningLetterMinAggregateOutputType | null
    _max: WarningLetterMaxAggregateOutputType | null
  }

  type GetWarningLetterGroupByPayload<T extends WarningLetterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WarningLetterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarningLetterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarningLetterGroupByOutputType[P]>
            : GetScalarType<T[P], WarningLetterGroupByOutputType[P]>
        }
      >
    >


  export type WarningLetterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    warningTier?: boolean
    issuedDate?: boolean
    status?: boolean
    month?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    records?: boolean | WarningLetter$recordsArgs<ExtArgs>
    _count?: boolean | WarningLetterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["warningLetter"]>


  export type WarningLetterSelectScalar = {
    id?: boolean
    studentId?: boolean
    warningTier?: boolean
    issuedDate?: boolean
    status?: boolean
    month?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WarningLetterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    records?: boolean | WarningLetter$recordsArgs<ExtArgs>
    _count?: boolean | WarningLetterCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $WarningLetterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WarningLetter"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      records: Prisma.$DisciplinaryRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: string
      warningTier: number
      issuedDate: Date
      status: string
      month: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["warningLetter"]>
    composites: {}
  }

  type WarningLetterGetPayload<S extends boolean | null | undefined | WarningLetterDefaultArgs> = $Result.GetResult<Prisma.$WarningLetterPayload, S>

  type WarningLetterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WarningLetterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WarningLetterCountAggregateInputType | true
    }

  export interface WarningLetterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WarningLetter'], meta: { name: 'WarningLetter' } }
    /**
     * Find zero or one WarningLetter that matches the filter.
     * @param {WarningLetterFindUniqueArgs} args - Arguments to find a WarningLetter
     * @example
     * // Get one WarningLetter
     * const warningLetter = await prisma.warningLetter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WarningLetterFindUniqueArgs>(args: SelectSubset<T, WarningLetterFindUniqueArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WarningLetter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WarningLetterFindUniqueOrThrowArgs} args - Arguments to find a WarningLetter
     * @example
     * // Get one WarningLetter
     * const warningLetter = await prisma.warningLetter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WarningLetterFindUniqueOrThrowArgs>(args: SelectSubset<T, WarningLetterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WarningLetter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterFindFirstArgs} args - Arguments to find a WarningLetter
     * @example
     * // Get one WarningLetter
     * const warningLetter = await prisma.warningLetter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WarningLetterFindFirstArgs>(args?: SelectSubset<T, WarningLetterFindFirstArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WarningLetter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterFindFirstOrThrowArgs} args - Arguments to find a WarningLetter
     * @example
     * // Get one WarningLetter
     * const warningLetter = await prisma.warningLetter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WarningLetterFindFirstOrThrowArgs>(args?: SelectSubset<T, WarningLetterFindFirstOrThrowArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WarningLetters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WarningLetters
     * const warningLetters = await prisma.warningLetter.findMany()
     * 
     * // Get first 10 WarningLetters
     * const warningLetters = await prisma.warningLetter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warningLetterWithIdOnly = await prisma.warningLetter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WarningLetterFindManyArgs>(args?: SelectSubset<T, WarningLetterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WarningLetter.
     * @param {WarningLetterCreateArgs} args - Arguments to create a WarningLetter.
     * @example
     * // Create one WarningLetter
     * const WarningLetter = await prisma.warningLetter.create({
     *   data: {
     *     // ... data to create a WarningLetter
     *   }
     * })
     * 
     */
    create<T extends WarningLetterCreateArgs>(args: SelectSubset<T, WarningLetterCreateArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WarningLetters.
     * @param {WarningLetterCreateManyArgs} args - Arguments to create many WarningLetters.
     * @example
     * // Create many WarningLetters
     * const warningLetter = await prisma.warningLetter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WarningLetterCreateManyArgs>(args?: SelectSubset<T, WarningLetterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WarningLetter.
     * @param {WarningLetterDeleteArgs} args - Arguments to delete one WarningLetter.
     * @example
     * // Delete one WarningLetter
     * const WarningLetter = await prisma.warningLetter.delete({
     *   where: {
     *     // ... filter to delete one WarningLetter
     *   }
     * })
     * 
     */
    delete<T extends WarningLetterDeleteArgs>(args: SelectSubset<T, WarningLetterDeleteArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WarningLetter.
     * @param {WarningLetterUpdateArgs} args - Arguments to update one WarningLetter.
     * @example
     * // Update one WarningLetter
     * const warningLetter = await prisma.warningLetter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WarningLetterUpdateArgs>(args: SelectSubset<T, WarningLetterUpdateArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WarningLetters.
     * @param {WarningLetterDeleteManyArgs} args - Arguments to filter WarningLetters to delete.
     * @example
     * // Delete a few WarningLetters
     * const { count } = await prisma.warningLetter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WarningLetterDeleteManyArgs>(args?: SelectSubset<T, WarningLetterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WarningLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WarningLetters
     * const warningLetter = await prisma.warningLetter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WarningLetterUpdateManyArgs>(args: SelectSubset<T, WarningLetterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WarningLetter.
     * @param {WarningLetterUpsertArgs} args - Arguments to update or create a WarningLetter.
     * @example
     * // Update or create a WarningLetter
     * const warningLetter = await prisma.warningLetter.upsert({
     *   create: {
     *     // ... data to create a WarningLetter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WarningLetter we want to update
     *   }
     * })
     */
    upsert<T extends WarningLetterUpsertArgs>(args: SelectSubset<T, WarningLetterUpsertArgs<ExtArgs>>): Prisma__WarningLetterClient<$Result.GetResult<Prisma.$WarningLetterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WarningLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterCountArgs} args - Arguments to filter WarningLetters to count.
     * @example
     * // Count the number of WarningLetters
     * const count = await prisma.warningLetter.count({
     *   where: {
     *     // ... the filter for the WarningLetters we want to count
     *   }
     * })
    **/
    count<T extends WarningLetterCountArgs>(
      args?: Subset<T, WarningLetterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarningLetterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WarningLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WarningLetterAggregateArgs>(args: Subset<T, WarningLetterAggregateArgs>): Prisma.PrismaPromise<GetWarningLetterAggregateType<T>>

    /**
     * Group by WarningLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarningLetterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WarningLetterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarningLetterGroupByArgs['orderBy'] }
        : { orderBy?: WarningLetterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WarningLetterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarningLetterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WarningLetter model
   */
  readonly fields: WarningLetterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WarningLetter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WarningLetterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    records<T extends WarningLetter$recordsArgs<ExtArgs> = {}>(args?: Subset<T, WarningLetter$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaryRecordPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WarningLetter model
   */ 
  interface WarningLetterFieldRefs {
    readonly id: FieldRef<"WarningLetter", 'Int'>
    readonly studentId: FieldRef<"WarningLetter", 'String'>
    readonly warningTier: FieldRef<"WarningLetter", 'Int'>
    readonly issuedDate: FieldRef<"WarningLetter", 'DateTime'>
    readonly status: FieldRef<"WarningLetter", 'String'>
    readonly month: FieldRef<"WarningLetter", 'String'>
    readonly createdAt: FieldRef<"WarningLetter", 'DateTime'>
    readonly updatedAt: FieldRef<"WarningLetter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WarningLetter findUnique
   */
  export type WarningLetterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter, which WarningLetter to fetch.
     */
    where: WarningLetterWhereUniqueInput
  }

  /**
   * WarningLetter findUniqueOrThrow
   */
  export type WarningLetterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter, which WarningLetter to fetch.
     */
    where: WarningLetterWhereUniqueInput
  }

  /**
   * WarningLetter findFirst
   */
  export type WarningLetterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter, which WarningLetter to fetch.
     */
    where?: WarningLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WarningLetters to fetch.
     */
    orderBy?: WarningLetterOrderByWithRelationInput | WarningLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WarningLetters.
     */
    cursor?: WarningLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WarningLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WarningLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WarningLetters.
     */
    distinct?: WarningLetterScalarFieldEnum | WarningLetterScalarFieldEnum[]
  }

  /**
   * WarningLetter findFirstOrThrow
   */
  export type WarningLetterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter, which WarningLetter to fetch.
     */
    where?: WarningLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WarningLetters to fetch.
     */
    orderBy?: WarningLetterOrderByWithRelationInput | WarningLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WarningLetters.
     */
    cursor?: WarningLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WarningLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WarningLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WarningLetters.
     */
    distinct?: WarningLetterScalarFieldEnum | WarningLetterScalarFieldEnum[]
  }

  /**
   * WarningLetter findMany
   */
  export type WarningLetterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter, which WarningLetters to fetch.
     */
    where?: WarningLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WarningLetters to fetch.
     */
    orderBy?: WarningLetterOrderByWithRelationInput | WarningLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WarningLetters.
     */
    cursor?: WarningLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WarningLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WarningLetters.
     */
    skip?: number
    distinct?: WarningLetterScalarFieldEnum | WarningLetterScalarFieldEnum[]
  }

  /**
   * WarningLetter create
   */
  export type WarningLetterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * The data needed to create a WarningLetter.
     */
    data: XOR<WarningLetterCreateInput, WarningLetterUncheckedCreateInput>
  }

  /**
   * WarningLetter createMany
   */
  export type WarningLetterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WarningLetters.
     */
    data: WarningLetterCreateManyInput | WarningLetterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WarningLetter update
   */
  export type WarningLetterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * The data needed to update a WarningLetter.
     */
    data: XOR<WarningLetterUpdateInput, WarningLetterUncheckedUpdateInput>
    /**
     * Choose, which WarningLetter to update.
     */
    where: WarningLetterWhereUniqueInput
  }

  /**
   * WarningLetter updateMany
   */
  export type WarningLetterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WarningLetters.
     */
    data: XOR<WarningLetterUpdateManyMutationInput, WarningLetterUncheckedUpdateManyInput>
    /**
     * Filter which WarningLetters to update
     */
    where?: WarningLetterWhereInput
  }

  /**
   * WarningLetter upsert
   */
  export type WarningLetterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * The filter to search for the WarningLetter to update in case it exists.
     */
    where: WarningLetterWhereUniqueInput
    /**
     * In case the WarningLetter found by the `where` argument doesn't exist, create a new WarningLetter with this data.
     */
    create: XOR<WarningLetterCreateInput, WarningLetterUncheckedCreateInput>
    /**
     * In case the WarningLetter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WarningLetterUpdateInput, WarningLetterUncheckedUpdateInput>
  }

  /**
   * WarningLetter delete
   */
  export type WarningLetterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
    /**
     * Filter which WarningLetter to delete.
     */
    where: WarningLetterWhereUniqueInput
  }

  /**
   * WarningLetter deleteMany
   */
  export type WarningLetterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WarningLetters to delete
     */
    where?: WarningLetterWhereInput
  }

  /**
   * WarningLetter.records
   */
  export type WarningLetter$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaryRecord
     */
    select?: DisciplinaryRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaryRecordInclude<ExtArgs> | null
    where?: DisciplinaryRecordWhereInput
    orderBy?: DisciplinaryRecordOrderByWithRelationInput | DisciplinaryRecordOrderByWithRelationInput[]
    cursor?: DisciplinaryRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisciplinaryRecordScalarFieldEnum | DisciplinaryRecordScalarFieldEnum[]
  }

  /**
   * WarningLetter without action
   */
  export type WarningLetterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WarningLetter
     */
    select?: WarningLetterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WarningLetterInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    studentNumber: 'studentNumber',
    icNumber: 'icNumber',
    name: 'name',
    email: 'email',
    studentPhone: 'studentPhone',
    kursusId: 'kursusId',
    cohort: 'cohort',
    programType: 'programType',
    semester: 'semester',
    status: 'status',
    parentName: 'parentName',
    parentPhone: 'parentPhone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const KursusScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name'
  };

  export type KursusScalarFieldEnum = (typeof KursusScalarFieldEnum)[keyof typeof KursusScalarFieldEnum]


  export const OffenceTypeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    category: 'category',
    description: 'description'
  };

  export type OffenceTypeScalarFieldEnum = (typeof OffenceTypeScalarFieldEnum)[keyof typeof OffenceTypeScalarFieldEnum]


  export const DisciplinaryRecordScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    offenceTypeId: 'offenceTypeId',
    teacherId: 'teacherId',
    date: 'date',
    description: 'description',
    createdAt: 'createdAt',
    warningLetterId: 'warningLetterId'
  };

  export type DisciplinaryRecordScalarFieldEnum = (typeof DisciplinaryRecordScalarFieldEnum)[keyof typeof DisciplinaryRecordScalarFieldEnum]


  export const WarningLetterScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    warningTier: 'warningTier',
    issuedDate: 'issuedDate',
    status: 'status',
    month: 'month',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WarningLetterScalarFieldEnum = (typeof WarningLetterScalarFieldEnum)[keyof typeof WarningLetterScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    records?: DisciplinaryRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    records?: DisciplinaryRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    records?: DisciplinaryRecordListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    studentNumber?: StringFilter<"Student"> | string
    icNumber?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    studentPhone?: StringNullableFilter<"Student"> | string | null
    kursusId?: IntFilter<"Student"> | number
    cohort?: IntFilter<"Student"> | number
    programType?: StringFilter<"Student"> | string
    semester?: IntFilter<"Student"> | number
    status?: StringFilter<"Student"> | string
    parentName?: StringFilter<"Student"> | string
    parentPhone?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    kursus?: XOR<KursusRelationFilter, KursusWhereInput>
    records?: DisciplinaryRecordListRelationFilter
    warningLetters?: WarningLetterListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    studentNumber?: SortOrder
    icNumber?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    studentPhone?: SortOrderInput | SortOrder
    kursusId?: SortOrder
    cohort?: SortOrder
    programType?: SortOrder
    semester?: SortOrder
    status?: SortOrder
    parentName?: SortOrder
    parentPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kursus?: KursusOrderByWithRelationInput
    records?: DisciplinaryRecordOrderByRelationAggregateInput
    warningLetters?: WarningLetterOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    studentNumber?: string
    icNumber?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    studentPhone?: StringNullableFilter<"Student"> | string | null
    kursusId?: IntFilter<"Student"> | number
    cohort?: IntFilter<"Student"> | number
    programType?: StringFilter<"Student"> | string
    semester?: IntFilter<"Student"> | number
    status?: StringFilter<"Student"> | string
    parentName?: StringFilter<"Student"> | string
    parentPhone?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    kursus?: XOR<KursusRelationFilter, KursusWhereInput>
    records?: DisciplinaryRecordListRelationFilter
    warningLetters?: WarningLetterListRelationFilter
  }, "studentNumber" | "icNumber">

  export type StudentOrderByWithAggregationInput = {
    studentNumber?: SortOrder
    icNumber?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    studentPhone?: SortOrderInput | SortOrder
    kursusId?: SortOrder
    cohort?: SortOrder
    programType?: SortOrder
    semester?: SortOrder
    status?: SortOrder
    parentName?: SortOrder
    parentPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    studentNumber?: StringWithAggregatesFilter<"Student"> | string
    icNumber?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    email?: StringNullableWithAggregatesFilter<"Student"> | string | null
    studentPhone?: StringNullableWithAggregatesFilter<"Student"> | string | null
    kursusId?: IntWithAggregatesFilter<"Student"> | number
    cohort?: IntWithAggregatesFilter<"Student"> | number
    programType?: StringWithAggregatesFilter<"Student"> | string
    semester?: IntWithAggregatesFilter<"Student"> | number
    status?: StringWithAggregatesFilter<"Student"> | string
    parentName?: StringWithAggregatesFilter<"Student"> | string
    parentPhone?: StringWithAggregatesFilter<"Student"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type KursusWhereInput = {
    AND?: KursusWhereInput | KursusWhereInput[]
    OR?: KursusWhereInput[]
    NOT?: KursusWhereInput | KursusWhereInput[]
    id?: IntFilter<"Kursus"> | number
    code?: StringFilter<"Kursus"> | string
    name?: StringFilter<"Kursus"> | string
    students?: StudentListRelationFilter
  }

  export type KursusOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    students?: StudentOrderByRelationAggregateInput
  }

  export type KursusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: KursusWhereInput | KursusWhereInput[]
    OR?: KursusWhereInput[]
    NOT?: KursusWhereInput | KursusWhereInput[]
    name?: StringFilter<"Kursus"> | string
    students?: StudentListRelationFilter
  }, "id" | "code">

  export type KursusOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    _count?: KursusCountOrderByAggregateInput
    _avg?: KursusAvgOrderByAggregateInput
    _max?: KursusMaxOrderByAggregateInput
    _min?: KursusMinOrderByAggregateInput
    _sum?: KursusSumOrderByAggregateInput
  }

  export type KursusScalarWhereWithAggregatesInput = {
    AND?: KursusScalarWhereWithAggregatesInput | KursusScalarWhereWithAggregatesInput[]
    OR?: KursusScalarWhereWithAggregatesInput[]
    NOT?: KursusScalarWhereWithAggregatesInput | KursusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Kursus"> | number
    code?: StringWithAggregatesFilter<"Kursus"> | string
    name?: StringWithAggregatesFilter<"Kursus"> | string
  }

  export type OffenceTypeWhereInput = {
    AND?: OffenceTypeWhereInput | OffenceTypeWhereInput[]
    OR?: OffenceTypeWhereInput[]
    NOT?: OffenceTypeWhereInput | OffenceTypeWhereInput[]
    id?: IntFilter<"OffenceType"> | number
    code?: StringFilter<"OffenceType"> | string
    name?: StringFilter<"OffenceType"> | string
    category?: StringFilter<"OffenceType"> | string
    description?: StringNullableFilter<"OffenceType"> | string | null
    records?: DisciplinaryRecordListRelationFilter
  }

  export type OffenceTypeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    records?: DisciplinaryRecordOrderByRelationAggregateInput
  }

  export type OffenceTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: OffenceTypeWhereInput | OffenceTypeWhereInput[]
    OR?: OffenceTypeWhereInput[]
    NOT?: OffenceTypeWhereInput | OffenceTypeWhereInput[]
    name?: StringFilter<"OffenceType"> | string
    category?: StringFilter<"OffenceType"> | string
    description?: StringNullableFilter<"OffenceType"> | string | null
    records?: DisciplinaryRecordListRelationFilter
  }, "id" | "code">

  export type OffenceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: OffenceTypeCountOrderByAggregateInput
    _avg?: OffenceTypeAvgOrderByAggregateInput
    _max?: OffenceTypeMaxOrderByAggregateInput
    _min?: OffenceTypeMinOrderByAggregateInput
    _sum?: OffenceTypeSumOrderByAggregateInput
  }

  export type OffenceTypeScalarWhereWithAggregatesInput = {
    AND?: OffenceTypeScalarWhereWithAggregatesInput | OffenceTypeScalarWhereWithAggregatesInput[]
    OR?: OffenceTypeScalarWhereWithAggregatesInput[]
    NOT?: OffenceTypeScalarWhereWithAggregatesInput | OffenceTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OffenceType"> | number
    code?: StringWithAggregatesFilter<"OffenceType"> | string
    name?: StringWithAggregatesFilter<"OffenceType"> | string
    category?: StringWithAggregatesFilter<"OffenceType"> | string
    description?: StringNullableWithAggregatesFilter<"OffenceType"> | string | null
  }

  export type DisciplinaryRecordWhereInput = {
    AND?: DisciplinaryRecordWhereInput | DisciplinaryRecordWhereInput[]
    OR?: DisciplinaryRecordWhereInput[]
    NOT?: DisciplinaryRecordWhereInput | DisciplinaryRecordWhereInput[]
    id?: IntFilter<"DisciplinaryRecord"> | number
    studentId?: StringFilter<"DisciplinaryRecord"> | string
    offenceTypeId?: IntFilter<"DisciplinaryRecord"> | number
    teacherId?: IntFilter<"DisciplinaryRecord"> | number
    date?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    description?: StringFilter<"DisciplinaryRecord"> | string
    createdAt?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    warningLetterId?: IntNullableFilter<"DisciplinaryRecord"> | number | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    offenceType?: XOR<OffenceTypeRelationFilter, OffenceTypeWhereInput>
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    warningLetter?: XOR<WarningLetterNullableRelationFilter, WarningLetterWhereInput> | null
  }

  export type DisciplinaryRecordOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    warningLetterId?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
    offenceType?: OffenceTypeOrderByWithRelationInput
    teacher?: UserOrderByWithRelationInput
    warningLetter?: WarningLetterOrderByWithRelationInput
  }

  export type DisciplinaryRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DisciplinaryRecordWhereInput | DisciplinaryRecordWhereInput[]
    OR?: DisciplinaryRecordWhereInput[]
    NOT?: DisciplinaryRecordWhereInput | DisciplinaryRecordWhereInput[]
    studentId?: StringFilter<"DisciplinaryRecord"> | string
    offenceTypeId?: IntFilter<"DisciplinaryRecord"> | number
    teacherId?: IntFilter<"DisciplinaryRecord"> | number
    date?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    description?: StringFilter<"DisciplinaryRecord"> | string
    createdAt?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    warningLetterId?: IntNullableFilter<"DisciplinaryRecord"> | number | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    offenceType?: XOR<OffenceTypeRelationFilter, OffenceTypeWhereInput>
    teacher?: XOR<UserRelationFilter, UserWhereInput>
    warningLetter?: XOR<WarningLetterNullableRelationFilter, WarningLetterWhereInput> | null
  }, "id">

  export type DisciplinaryRecordOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    warningLetterId?: SortOrderInput | SortOrder
    _count?: DisciplinaryRecordCountOrderByAggregateInput
    _avg?: DisciplinaryRecordAvgOrderByAggregateInput
    _max?: DisciplinaryRecordMaxOrderByAggregateInput
    _min?: DisciplinaryRecordMinOrderByAggregateInput
    _sum?: DisciplinaryRecordSumOrderByAggregateInput
  }

  export type DisciplinaryRecordScalarWhereWithAggregatesInput = {
    AND?: DisciplinaryRecordScalarWhereWithAggregatesInput | DisciplinaryRecordScalarWhereWithAggregatesInput[]
    OR?: DisciplinaryRecordScalarWhereWithAggregatesInput[]
    NOT?: DisciplinaryRecordScalarWhereWithAggregatesInput | DisciplinaryRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DisciplinaryRecord"> | number
    studentId?: StringWithAggregatesFilter<"DisciplinaryRecord"> | string
    offenceTypeId?: IntWithAggregatesFilter<"DisciplinaryRecord"> | number
    teacherId?: IntWithAggregatesFilter<"DisciplinaryRecord"> | number
    date?: DateTimeWithAggregatesFilter<"DisciplinaryRecord"> | Date | string
    description?: StringWithAggregatesFilter<"DisciplinaryRecord"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DisciplinaryRecord"> | Date | string
    warningLetterId?: IntNullableWithAggregatesFilter<"DisciplinaryRecord"> | number | null
  }

  export type WarningLetterWhereInput = {
    AND?: WarningLetterWhereInput | WarningLetterWhereInput[]
    OR?: WarningLetterWhereInput[]
    NOT?: WarningLetterWhereInput | WarningLetterWhereInput[]
    id?: IntFilter<"WarningLetter"> | number
    studentId?: StringFilter<"WarningLetter"> | string
    warningTier?: IntFilter<"WarningLetter"> | number
    issuedDate?: DateTimeFilter<"WarningLetter"> | Date | string
    status?: StringFilter<"WarningLetter"> | string
    month?: StringFilter<"WarningLetter"> | string
    createdAt?: DateTimeFilter<"WarningLetter"> | Date | string
    updatedAt?: DateTimeFilter<"WarningLetter"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    records?: DisciplinaryRecordListRelationFilter
  }

  export type WarningLetterOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    warningTier?: SortOrder
    issuedDate?: SortOrder
    status?: SortOrder
    month?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    records?: DisciplinaryRecordOrderByRelationAggregateInput
  }

  export type WarningLetterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WarningLetterWhereInput | WarningLetterWhereInput[]
    OR?: WarningLetterWhereInput[]
    NOT?: WarningLetterWhereInput | WarningLetterWhereInput[]
    studentId?: StringFilter<"WarningLetter"> | string
    warningTier?: IntFilter<"WarningLetter"> | number
    issuedDate?: DateTimeFilter<"WarningLetter"> | Date | string
    status?: StringFilter<"WarningLetter"> | string
    month?: StringFilter<"WarningLetter"> | string
    createdAt?: DateTimeFilter<"WarningLetter"> | Date | string
    updatedAt?: DateTimeFilter<"WarningLetter"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    records?: DisciplinaryRecordListRelationFilter
  }, "id">

  export type WarningLetterOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    warningTier?: SortOrder
    issuedDate?: SortOrder
    status?: SortOrder
    month?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WarningLetterCountOrderByAggregateInput
    _avg?: WarningLetterAvgOrderByAggregateInput
    _max?: WarningLetterMaxOrderByAggregateInput
    _min?: WarningLetterMinOrderByAggregateInput
    _sum?: WarningLetterSumOrderByAggregateInput
  }

  export type WarningLetterScalarWhereWithAggregatesInput = {
    AND?: WarningLetterScalarWhereWithAggregatesInput | WarningLetterScalarWhereWithAggregatesInput[]
    OR?: WarningLetterScalarWhereWithAggregatesInput[]
    NOT?: WarningLetterScalarWhereWithAggregatesInput | WarningLetterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WarningLetter"> | number
    studentId?: StringWithAggregatesFilter<"WarningLetter"> | string
    warningTier?: IntWithAggregatesFilter<"WarningLetter"> | number
    issuedDate?: DateTimeWithAggregatesFilter<"WarningLetter"> | Date | string
    status?: StringWithAggregatesFilter<"WarningLetter"> | string
    month?: StringWithAggregatesFilter<"WarningLetter"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WarningLetter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WarningLetter"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordCreateNestedManyWithoutTeacherInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUpdateManyWithoutTeacherNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kursus: KursusCreateNestedOneWithoutStudentsInput
    records?: DisciplinaryRecordCreateNestedManyWithoutStudentInput
    warningLetters?: WarningLetterCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    kursusId: number
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutStudentInput
    warningLetters?: WarningLetterUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kursus?: KursusUpdateOneRequiredWithoutStudentsNestedInput
    records?: DisciplinaryRecordUpdateManyWithoutStudentNestedInput
    warningLetters?: WarningLetterUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kursusId?: IntFieldUpdateOperationsInput | number
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutStudentNestedInput
    warningLetters?: WarningLetterUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    kursusId: number
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kursusId?: IntFieldUpdateOperationsInput | number
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KursusCreateInput = {
    code: string
    name: string
    students?: StudentCreateNestedManyWithoutKursusInput
  }

  export type KursusUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    students?: StudentUncheckedCreateNestedManyWithoutKursusInput
  }

  export type KursusUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentUpdateManyWithoutKursusNestedInput
  }

  export type KursusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentUncheckedUpdateManyWithoutKursusNestedInput
  }

  export type KursusCreateManyInput = {
    id?: number
    code: string
    name: string
  }

  export type KursusUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type KursusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type OffenceTypeCreateInput = {
    code: string
    name: string
    category: string
    description?: string | null
    records?: DisciplinaryRecordCreateNestedManyWithoutOffenceTypeInput
  }

  export type OffenceTypeUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    category: string
    description?: string | null
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutOffenceTypeInput
  }

  export type OffenceTypeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    records?: DisciplinaryRecordUpdateManyWithoutOffenceTypeNestedInput
  }

  export type OffenceTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutOffenceTypeNestedInput
  }

  export type OffenceTypeCreateManyInput = {
    id?: number
    code: string
    name: string
    category: string
    description?: string | null
  }

  export type OffenceTypeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OffenceTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisciplinaryRecordCreateInput = {
    date?: Date | string
    description: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutRecordsInput
    offenceType: OffenceTypeCreateNestedOneWithoutRecordsInput
    teacher: UserCreateNestedOneWithoutRecordsInput
    warningLetter?: WarningLetterCreateNestedOneWithoutRecordsInput
  }

  export type DisciplinaryRecordUncheckedCreateInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRecordsNestedInput
    offenceType?: OffenceTypeUpdateOneRequiredWithoutRecordsNestedInput
    teacher?: UserUpdateOneRequiredWithoutRecordsNestedInput
    warningLetter?: WarningLetterUpdateOneWithoutRecordsNestedInput
  }

  export type DisciplinaryRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordCreateManyInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaryRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WarningLetterCreateInput = {
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutWarningLettersInput
    records?: DisciplinaryRecordCreateNestedManyWithoutWarningLetterInput
  }

  export type WarningLetterUncheckedCreateInput = {
    id?: number
    studentId: string
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutWarningLetterInput
  }

  export type WarningLetterUpdateInput = {
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutWarningLettersNestedInput
    records?: DisciplinaryRecordUpdateManyWithoutWarningLetterNestedInput
  }

  export type WarningLetterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutWarningLetterNestedInput
  }

  export type WarningLetterCreateManyInput = {
    id?: number
    studentId: string
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarningLetterUpdateManyMutationInput = {
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarningLetterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DisciplinaryRecordListRelationFilter = {
    every?: DisciplinaryRecordWhereInput
    some?: DisciplinaryRecordWhereInput
    none?: DisciplinaryRecordWhereInput
  }

  export type DisciplinaryRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type KursusRelationFilter = {
    is?: KursusWhereInput
    isNot?: KursusWhereInput
  }

  export type WarningLetterListRelationFilter = {
    every?: WarningLetterWhereInput
    some?: WarningLetterWhereInput
    none?: WarningLetterWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WarningLetterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    studentNumber?: SortOrder
    icNumber?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentPhone?: SortOrder
    kursusId?: SortOrder
    cohort?: SortOrder
    programType?: SortOrder
    semester?: SortOrder
    status?: SortOrder
    parentName?: SortOrder
    parentPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    kursusId?: SortOrder
    cohort?: SortOrder
    semester?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    studentNumber?: SortOrder
    icNumber?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentPhone?: SortOrder
    kursusId?: SortOrder
    cohort?: SortOrder
    programType?: SortOrder
    semester?: SortOrder
    status?: SortOrder
    parentName?: SortOrder
    parentPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    studentNumber?: SortOrder
    icNumber?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentPhone?: SortOrder
    kursusId?: SortOrder
    cohort?: SortOrder
    programType?: SortOrder
    semester?: SortOrder
    status?: SortOrder
    parentName?: SortOrder
    parentPhone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    kursusId?: SortOrder
    cohort?: SortOrder
    semester?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KursusCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type KursusAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type KursusMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type KursusMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
  }

  export type KursusSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OffenceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type OffenceTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OffenceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type OffenceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
  }

  export type OffenceTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type OffenceTypeRelationFilter = {
    is?: OffenceTypeWhereInput
    isNot?: OffenceTypeWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WarningLetterNullableRelationFilter = {
    is?: WarningLetterWhereInput | null
    isNot?: WarningLetterWhereInput | null
  }

  export type DisciplinaryRecordCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    warningLetterId?: SortOrder
  }

  export type DisciplinaryRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    warningLetterId?: SortOrder
  }

  export type DisciplinaryRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    warningLetterId?: SortOrder
  }

  export type DisciplinaryRecordMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    warningLetterId?: SortOrder
  }

  export type DisciplinaryRecordSumOrderByAggregateInput = {
    id?: SortOrder
    offenceTypeId?: SortOrder
    teacherId?: SortOrder
    warningLetterId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type WarningLetterCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    warningTier?: SortOrder
    issuedDate?: SortOrder
    status?: SortOrder
    month?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarningLetterAvgOrderByAggregateInput = {
    id?: SortOrder
    warningTier?: SortOrder
  }

  export type WarningLetterMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    warningTier?: SortOrder
    issuedDate?: SortOrder
    status?: SortOrder
    month?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarningLetterMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    warningTier?: SortOrder
    issuedDate?: SortOrder
    status?: SortOrder
    month?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WarningLetterSumOrderByAggregateInput = {
    id?: SortOrder
    warningTier?: SortOrder
  }

  export type DisciplinaryRecordCreateNestedManyWithoutTeacherInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput> | DisciplinaryRecordCreateWithoutTeacherInput[] | DisciplinaryRecordUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutTeacherInput | DisciplinaryRecordCreateOrConnectWithoutTeacherInput[]
    createMany?: DisciplinaryRecordCreateManyTeacherInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type DisciplinaryRecordUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput> | DisciplinaryRecordCreateWithoutTeacherInput[] | DisciplinaryRecordUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutTeacherInput | DisciplinaryRecordCreateOrConnectWithoutTeacherInput[]
    createMany?: DisciplinaryRecordCreateManyTeacherInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DisciplinaryRecordUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput> | DisciplinaryRecordCreateWithoutTeacherInput[] | DisciplinaryRecordUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutTeacherInput | DisciplinaryRecordCreateOrConnectWithoutTeacherInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutTeacherInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: DisciplinaryRecordCreateManyTeacherInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutTeacherInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutTeacherInput | DisciplinaryRecordUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput> | DisciplinaryRecordCreateWithoutTeacherInput[] | DisciplinaryRecordUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutTeacherInput | DisciplinaryRecordCreateOrConnectWithoutTeacherInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutTeacherInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: DisciplinaryRecordCreateManyTeacherInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutTeacherInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutTeacherInput | DisciplinaryRecordUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type KursusCreateNestedOneWithoutStudentsInput = {
    create?: XOR<KursusCreateWithoutStudentsInput, KursusUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: KursusCreateOrConnectWithoutStudentsInput
    connect?: KursusWhereUniqueInput
  }

  export type DisciplinaryRecordCreateNestedManyWithoutStudentInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput> | DisciplinaryRecordCreateWithoutStudentInput[] | DisciplinaryRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutStudentInput | DisciplinaryRecordCreateOrConnectWithoutStudentInput[]
    createMany?: DisciplinaryRecordCreateManyStudentInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type WarningLetterCreateNestedManyWithoutStudentInput = {
    create?: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput> | WarningLetterCreateWithoutStudentInput[] | WarningLetterUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: WarningLetterCreateOrConnectWithoutStudentInput | WarningLetterCreateOrConnectWithoutStudentInput[]
    createMany?: WarningLetterCreateManyStudentInputEnvelope
    connect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
  }

  export type DisciplinaryRecordUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput> | DisciplinaryRecordCreateWithoutStudentInput[] | DisciplinaryRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutStudentInput | DisciplinaryRecordCreateOrConnectWithoutStudentInput[]
    createMany?: DisciplinaryRecordCreateManyStudentInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type WarningLetterUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput> | WarningLetterCreateWithoutStudentInput[] | WarningLetterUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: WarningLetterCreateOrConnectWithoutStudentInput | WarningLetterCreateOrConnectWithoutStudentInput[]
    createMany?: WarningLetterCreateManyStudentInputEnvelope
    connect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type KursusUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<KursusCreateWithoutStudentsInput, KursusUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: KursusCreateOrConnectWithoutStudentsInput
    upsert?: KursusUpsertWithoutStudentsInput
    connect?: KursusWhereUniqueInput
    update?: XOR<XOR<KursusUpdateToOneWithWhereWithoutStudentsInput, KursusUpdateWithoutStudentsInput>, KursusUncheckedUpdateWithoutStudentsInput>
  }

  export type DisciplinaryRecordUpdateManyWithoutStudentNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput> | DisciplinaryRecordCreateWithoutStudentInput[] | DisciplinaryRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutStudentInput | DisciplinaryRecordCreateOrConnectWithoutStudentInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutStudentInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: DisciplinaryRecordCreateManyStudentInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutStudentInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutStudentInput | DisciplinaryRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type WarningLetterUpdateManyWithoutStudentNestedInput = {
    create?: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput> | WarningLetterCreateWithoutStudentInput[] | WarningLetterUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: WarningLetterCreateOrConnectWithoutStudentInput | WarningLetterCreateOrConnectWithoutStudentInput[]
    upsert?: WarningLetterUpsertWithWhereUniqueWithoutStudentInput | WarningLetterUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: WarningLetterCreateManyStudentInputEnvelope
    set?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    disconnect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    delete?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    connect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    update?: WarningLetterUpdateWithWhereUniqueWithoutStudentInput | WarningLetterUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: WarningLetterUpdateManyWithWhereWithoutStudentInput | WarningLetterUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: WarningLetterScalarWhereInput | WarningLetterScalarWhereInput[]
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput> | DisciplinaryRecordCreateWithoutStudentInput[] | DisciplinaryRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutStudentInput | DisciplinaryRecordCreateOrConnectWithoutStudentInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutStudentInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: DisciplinaryRecordCreateManyStudentInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutStudentInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutStudentInput | DisciplinaryRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type WarningLetterUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput> | WarningLetterCreateWithoutStudentInput[] | WarningLetterUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: WarningLetterCreateOrConnectWithoutStudentInput | WarningLetterCreateOrConnectWithoutStudentInput[]
    upsert?: WarningLetterUpsertWithWhereUniqueWithoutStudentInput | WarningLetterUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: WarningLetterCreateManyStudentInputEnvelope
    set?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    disconnect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    delete?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    connect?: WarningLetterWhereUniqueInput | WarningLetterWhereUniqueInput[]
    update?: WarningLetterUpdateWithWhereUniqueWithoutStudentInput | WarningLetterUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: WarningLetterUpdateManyWithWhereWithoutStudentInput | WarningLetterUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: WarningLetterScalarWhereInput | WarningLetterScalarWhereInput[]
  }

  export type StudentCreateNestedManyWithoutKursusInput = {
    create?: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput> | StudentCreateWithoutKursusInput[] | StudentUncheckedCreateWithoutKursusInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutKursusInput | StudentCreateOrConnectWithoutKursusInput[]
    createMany?: StudentCreateManyKursusInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutKursusInput = {
    create?: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput> | StudentCreateWithoutKursusInput[] | StudentUncheckedCreateWithoutKursusInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutKursusInput | StudentCreateOrConnectWithoutKursusInput[]
    createMany?: StudentCreateManyKursusInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUpdateManyWithoutKursusNestedInput = {
    create?: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput> | StudentCreateWithoutKursusInput[] | StudentUncheckedCreateWithoutKursusInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutKursusInput | StudentCreateOrConnectWithoutKursusInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutKursusInput | StudentUpsertWithWhereUniqueWithoutKursusInput[]
    createMany?: StudentCreateManyKursusInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutKursusInput | StudentUpdateWithWhereUniqueWithoutKursusInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutKursusInput | StudentUpdateManyWithWhereWithoutKursusInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutKursusNestedInput = {
    create?: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput> | StudentCreateWithoutKursusInput[] | StudentUncheckedCreateWithoutKursusInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutKursusInput | StudentCreateOrConnectWithoutKursusInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutKursusInput | StudentUpsertWithWhereUniqueWithoutKursusInput[]
    createMany?: StudentCreateManyKursusInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutKursusInput | StudentUpdateWithWhereUniqueWithoutKursusInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutKursusInput | StudentUpdateManyWithWhereWithoutKursusInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type DisciplinaryRecordCreateNestedManyWithoutOffenceTypeInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput> | DisciplinaryRecordCreateWithoutOffenceTypeInput[] | DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput | DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput[]
    createMany?: DisciplinaryRecordCreateManyOffenceTypeInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type DisciplinaryRecordUncheckedCreateNestedManyWithoutOffenceTypeInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput> | DisciplinaryRecordCreateWithoutOffenceTypeInput[] | DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput | DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput[]
    createMany?: DisciplinaryRecordCreateManyOffenceTypeInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type DisciplinaryRecordUpdateManyWithoutOffenceTypeNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput> | DisciplinaryRecordCreateWithoutOffenceTypeInput[] | DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput | DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutOffenceTypeInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutOffenceTypeInput[]
    createMany?: DisciplinaryRecordCreateManyOffenceTypeInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutOffenceTypeInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutOffenceTypeInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutOffenceTypeInput | DisciplinaryRecordUpdateManyWithWhereWithoutOffenceTypeInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutOffenceTypeNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput> | DisciplinaryRecordCreateWithoutOffenceTypeInput[] | DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput | DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutOffenceTypeInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutOffenceTypeInput[]
    createMany?: DisciplinaryRecordCreateManyOffenceTypeInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutOffenceTypeInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutOffenceTypeInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutOffenceTypeInput | DisciplinaryRecordUpdateManyWithWhereWithoutOffenceTypeInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutRecordsInput = {
    create?: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRecordsInput
    connect?: StudentWhereUniqueInput
  }

  export type OffenceTypeCreateNestedOneWithoutRecordsInput = {
    create?: XOR<OffenceTypeCreateWithoutRecordsInput, OffenceTypeUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: OffenceTypeCreateOrConnectWithoutRecordsInput
    connect?: OffenceTypeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRecordsInput = {
    create?: XOR<UserCreateWithoutRecordsInput, UserUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type WarningLetterCreateNestedOneWithoutRecordsInput = {
    create?: XOR<WarningLetterCreateWithoutRecordsInput, WarningLetterUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: WarningLetterCreateOrConnectWithoutRecordsInput
    connect?: WarningLetterWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRecordsInput
    upsert?: StudentUpsertWithoutRecordsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutRecordsInput, StudentUpdateWithoutRecordsInput>, StudentUncheckedUpdateWithoutRecordsInput>
  }

  export type OffenceTypeUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<OffenceTypeCreateWithoutRecordsInput, OffenceTypeUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: OffenceTypeCreateOrConnectWithoutRecordsInput
    upsert?: OffenceTypeUpsertWithoutRecordsInput
    connect?: OffenceTypeWhereUniqueInput
    update?: XOR<XOR<OffenceTypeUpdateToOneWithWhereWithoutRecordsInput, OffenceTypeUpdateWithoutRecordsInput>, OffenceTypeUncheckedUpdateWithoutRecordsInput>
  }

  export type UserUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<UserCreateWithoutRecordsInput, UserUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecordsInput
    upsert?: UserUpsertWithoutRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecordsInput, UserUpdateWithoutRecordsInput>, UserUncheckedUpdateWithoutRecordsInput>
  }

  export type WarningLetterUpdateOneWithoutRecordsNestedInput = {
    create?: XOR<WarningLetterCreateWithoutRecordsInput, WarningLetterUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: WarningLetterCreateOrConnectWithoutRecordsInput
    upsert?: WarningLetterUpsertWithoutRecordsInput
    disconnect?: WarningLetterWhereInput | boolean
    delete?: WarningLetterWhereInput | boolean
    connect?: WarningLetterWhereUniqueInput
    update?: XOR<XOR<WarningLetterUpdateToOneWithWhereWithoutRecordsInput, WarningLetterUpdateWithoutRecordsInput>, WarningLetterUncheckedUpdateWithoutRecordsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentCreateNestedOneWithoutWarningLettersInput = {
    create?: XOR<StudentCreateWithoutWarningLettersInput, StudentUncheckedCreateWithoutWarningLettersInput>
    connectOrCreate?: StudentCreateOrConnectWithoutWarningLettersInput
    connect?: StudentWhereUniqueInput
  }

  export type DisciplinaryRecordCreateNestedManyWithoutWarningLetterInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput> | DisciplinaryRecordCreateWithoutWarningLetterInput[] | DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput | DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput[]
    createMany?: DisciplinaryRecordCreateManyWarningLetterInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type DisciplinaryRecordUncheckedCreateNestedManyWithoutWarningLetterInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput> | DisciplinaryRecordCreateWithoutWarningLetterInput[] | DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput | DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput[]
    createMany?: DisciplinaryRecordCreateManyWarningLetterInputEnvelope
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
  }

  export type StudentUpdateOneRequiredWithoutWarningLettersNestedInput = {
    create?: XOR<StudentCreateWithoutWarningLettersInput, StudentUncheckedCreateWithoutWarningLettersInput>
    connectOrCreate?: StudentCreateOrConnectWithoutWarningLettersInput
    upsert?: StudentUpsertWithoutWarningLettersInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutWarningLettersInput, StudentUpdateWithoutWarningLettersInput>, StudentUncheckedUpdateWithoutWarningLettersInput>
  }

  export type DisciplinaryRecordUpdateManyWithoutWarningLetterNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput> | DisciplinaryRecordCreateWithoutWarningLetterInput[] | DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput | DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutWarningLetterInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutWarningLetterInput[]
    createMany?: DisciplinaryRecordCreateManyWarningLetterInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutWarningLetterInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutWarningLetterInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutWarningLetterInput | DisciplinaryRecordUpdateManyWithWhereWithoutWarningLetterInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutWarningLetterNestedInput = {
    create?: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput> | DisciplinaryRecordCreateWithoutWarningLetterInput[] | DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput[]
    connectOrCreate?: DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput | DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput[]
    upsert?: DisciplinaryRecordUpsertWithWhereUniqueWithoutWarningLetterInput | DisciplinaryRecordUpsertWithWhereUniqueWithoutWarningLetterInput[]
    createMany?: DisciplinaryRecordCreateManyWarningLetterInputEnvelope
    set?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    disconnect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    delete?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    connect?: DisciplinaryRecordWhereUniqueInput | DisciplinaryRecordWhereUniqueInput[]
    update?: DisciplinaryRecordUpdateWithWhereUniqueWithoutWarningLetterInput | DisciplinaryRecordUpdateWithWhereUniqueWithoutWarningLetterInput[]
    updateMany?: DisciplinaryRecordUpdateManyWithWhereWithoutWarningLetterInput | DisciplinaryRecordUpdateManyWithWhereWithoutWarningLetterInput[]
    deleteMany?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DisciplinaryRecordCreateWithoutTeacherInput = {
    date?: Date | string
    description: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutRecordsInput
    offenceType: OffenceTypeCreateNestedOneWithoutRecordsInput
    warningLetter?: WarningLetterCreateNestedOneWithoutRecordsInput
  }

  export type DisciplinaryRecordUncheckedCreateWithoutTeacherInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordCreateOrConnectWithoutTeacherInput = {
    where: DisciplinaryRecordWhereUniqueInput
    create: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput>
  }

  export type DisciplinaryRecordCreateManyTeacherInputEnvelope = {
    data: DisciplinaryRecordCreateManyTeacherInput | DisciplinaryRecordCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type DisciplinaryRecordUpsertWithWhereUniqueWithoutTeacherInput = {
    where: DisciplinaryRecordWhereUniqueInput
    update: XOR<DisciplinaryRecordUpdateWithoutTeacherInput, DisciplinaryRecordUncheckedUpdateWithoutTeacherInput>
    create: XOR<DisciplinaryRecordCreateWithoutTeacherInput, DisciplinaryRecordUncheckedCreateWithoutTeacherInput>
  }

  export type DisciplinaryRecordUpdateWithWhereUniqueWithoutTeacherInput = {
    where: DisciplinaryRecordWhereUniqueInput
    data: XOR<DisciplinaryRecordUpdateWithoutTeacherInput, DisciplinaryRecordUncheckedUpdateWithoutTeacherInput>
  }

  export type DisciplinaryRecordUpdateManyWithWhereWithoutTeacherInput = {
    where: DisciplinaryRecordScalarWhereInput
    data: XOR<DisciplinaryRecordUpdateManyMutationInput, DisciplinaryRecordUncheckedUpdateManyWithoutTeacherInput>
  }

  export type DisciplinaryRecordScalarWhereInput = {
    AND?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
    OR?: DisciplinaryRecordScalarWhereInput[]
    NOT?: DisciplinaryRecordScalarWhereInput | DisciplinaryRecordScalarWhereInput[]
    id?: IntFilter<"DisciplinaryRecord"> | number
    studentId?: StringFilter<"DisciplinaryRecord"> | string
    offenceTypeId?: IntFilter<"DisciplinaryRecord"> | number
    teacherId?: IntFilter<"DisciplinaryRecord"> | number
    date?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    description?: StringFilter<"DisciplinaryRecord"> | string
    createdAt?: DateTimeFilter<"DisciplinaryRecord"> | Date | string
    warningLetterId?: IntNullableFilter<"DisciplinaryRecord"> | number | null
  }

  export type KursusCreateWithoutStudentsInput = {
    code: string
    name: string
  }

  export type KursusUncheckedCreateWithoutStudentsInput = {
    id?: number
    code: string
    name: string
  }

  export type KursusCreateOrConnectWithoutStudentsInput = {
    where: KursusWhereUniqueInput
    create: XOR<KursusCreateWithoutStudentsInput, KursusUncheckedCreateWithoutStudentsInput>
  }

  export type DisciplinaryRecordCreateWithoutStudentInput = {
    date?: Date | string
    description: string
    createdAt?: Date | string
    offenceType: OffenceTypeCreateNestedOneWithoutRecordsInput
    teacher: UserCreateNestedOneWithoutRecordsInput
    warningLetter?: WarningLetterCreateNestedOneWithoutRecordsInput
  }

  export type DisciplinaryRecordUncheckedCreateWithoutStudentInput = {
    id?: number
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordCreateOrConnectWithoutStudentInput = {
    where: DisciplinaryRecordWhereUniqueInput
    create: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput>
  }

  export type DisciplinaryRecordCreateManyStudentInputEnvelope = {
    data: DisciplinaryRecordCreateManyStudentInput | DisciplinaryRecordCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type WarningLetterCreateWithoutStudentInput = {
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordCreateNestedManyWithoutWarningLetterInput
  }

  export type WarningLetterUncheckedCreateWithoutStudentInput = {
    id?: number
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutWarningLetterInput
  }

  export type WarningLetterCreateOrConnectWithoutStudentInput = {
    where: WarningLetterWhereUniqueInput
    create: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput>
  }

  export type WarningLetterCreateManyStudentInputEnvelope = {
    data: WarningLetterCreateManyStudentInput | WarningLetterCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type KursusUpsertWithoutStudentsInput = {
    update: XOR<KursusUpdateWithoutStudentsInput, KursusUncheckedUpdateWithoutStudentsInput>
    create: XOR<KursusCreateWithoutStudentsInput, KursusUncheckedCreateWithoutStudentsInput>
    where?: KursusWhereInput
  }

  export type KursusUpdateToOneWithWhereWithoutStudentsInput = {
    where?: KursusWhereInput
    data: XOR<KursusUpdateWithoutStudentsInput, KursusUncheckedUpdateWithoutStudentsInput>
  }

  export type KursusUpdateWithoutStudentsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type KursusUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DisciplinaryRecordUpsertWithWhereUniqueWithoutStudentInput = {
    where: DisciplinaryRecordWhereUniqueInput
    update: XOR<DisciplinaryRecordUpdateWithoutStudentInput, DisciplinaryRecordUncheckedUpdateWithoutStudentInput>
    create: XOR<DisciplinaryRecordCreateWithoutStudentInput, DisciplinaryRecordUncheckedCreateWithoutStudentInput>
  }

  export type DisciplinaryRecordUpdateWithWhereUniqueWithoutStudentInput = {
    where: DisciplinaryRecordWhereUniqueInput
    data: XOR<DisciplinaryRecordUpdateWithoutStudentInput, DisciplinaryRecordUncheckedUpdateWithoutStudentInput>
  }

  export type DisciplinaryRecordUpdateManyWithWhereWithoutStudentInput = {
    where: DisciplinaryRecordScalarWhereInput
    data: XOR<DisciplinaryRecordUpdateManyMutationInput, DisciplinaryRecordUncheckedUpdateManyWithoutStudentInput>
  }

  export type WarningLetterUpsertWithWhereUniqueWithoutStudentInput = {
    where: WarningLetterWhereUniqueInput
    update: XOR<WarningLetterUpdateWithoutStudentInput, WarningLetterUncheckedUpdateWithoutStudentInput>
    create: XOR<WarningLetterCreateWithoutStudentInput, WarningLetterUncheckedCreateWithoutStudentInput>
  }

  export type WarningLetterUpdateWithWhereUniqueWithoutStudentInput = {
    where: WarningLetterWhereUniqueInput
    data: XOR<WarningLetterUpdateWithoutStudentInput, WarningLetterUncheckedUpdateWithoutStudentInput>
  }

  export type WarningLetterUpdateManyWithWhereWithoutStudentInput = {
    where: WarningLetterScalarWhereInput
    data: XOR<WarningLetterUpdateManyMutationInput, WarningLetterUncheckedUpdateManyWithoutStudentInput>
  }

  export type WarningLetterScalarWhereInput = {
    AND?: WarningLetterScalarWhereInput | WarningLetterScalarWhereInput[]
    OR?: WarningLetterScalarWhereInput[]
    NOT?: WarningLetterScalarWhereInput | WarningLetterScalarWhereInput[]
    id?: IntFilter<"WarningLetter"> | number
    studentId?: StringFilter<"WarningLetter"> | string
    warningTier?: IntFilter<"WarningLetter"> | number
    issuedDate?: DateTimeFilter<"WarningLetter"> | Date | string
    status?: StringFilter<"WarningLetter"> | string
    month?: StringFilter<"WarningLetter"> | string
    createdAt?: DateTimeFilter<"WarningLetter"> | Date | string
    updatedAt?: DateTimeFilter<"WarningLetter"> | Date | string
  }

  export type StudentCreateWithoutKursusInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordCreateNestedManyWithoutStudentInput
    warningLetters?: WarningLetterCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutKursusInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutStudentInput
    warningLetters?: WarningLetterUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutKursusInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput>
  }

  export type StudentCreateManyKursusInputEnvelope = {
    data: StudentCreateManyKursusInput | StudentCreateManyKursusInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithWhereUniqueWithoutKursusInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutKursusInput, StudentUncheckedUpdateWithoutKursusInput>
    create: XOR<StudentCreateWithoutKursusInput, StudentUncheckedCreateWithoutKursusInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutKursusInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutKursusInput, StudentUncheckedUpdateWithoutKursusInput>
  }

  export type StudentUpdateManyWithWhereWithoutKursusInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutKursusInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    studentNumber?: StringFilter<"Student"> | string
    icNumber?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    email?: StringNullableFilter<"Student"> | string | null
    studentPhone?: StringNullableFilter<"Student"> | string | null
    kursusId?: IntFilter<"Student"> | number
    cohort?: IntFilter<"Student"> | number
    programType?: StringFilter<"Student"> | string
    semester?: IntFilter<"Student"> | number
    status?: StringFilter<"Student"> | string
    parentName?: StringFilter<"Student"> | string
    parentPhone?: StringFilter<"Student"> | string
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
  }

  export type DisciplinaryRecordCreateWithoutOffenceTypeInput = {
    date?: Date | string
    description: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutRecordsInput
    teacher: UserCreateNestedOneWithoutRecordsInput
    warningLetter?: WarningLetterCreateNestedOneWithoutRecordsInput
  }

  export type DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput = {
    id?: number
    studentId: string
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordCreateOrConnectWithoutOffenceTypeInput = {
    where: DisciplinaryRecordWhereUniqueInput
    create: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput>
  }

  export type DisciplinaryRecordCreateManyOffenceTypeInputEnvelope = {
    data: DisciplinaryRecordCreateManyOffenceTypeInput | DisciplinaryRecordCreateManyOffenceTypeInput[]
    skipDuplicates?: boolean
  }

  export type DisciplinaryRecordUpsertWithWhereUniqueWithoutOffenceTypeInput = {
    where: DisciplinaryRecordWhereUniqueInput
    update: XOR<DisciplinaryRecordUpdateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedUpdateWithoutOffenceTypeInput>
    create: XOR<DisciplinaryRecordCreateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedCreateWithoutOffenceTypeInput>
  }

  export type DisciplinaryRecordUpdateWithWhereUniqueWithoutOffenceTypeInput = {
    where: DisciplinaryRecordWhereUniqueInput
    data: XOR<DisciplinaryRecordUpdateWithoutOffenceTypeInput, DisciplinaryRecordUncheckedUpdateWithoutOffenceTypeInput>
  }

  export type DisciplinaryRecordUpdateManyWithWhereWithoutOffenceTypeInput = {
    where: DisciplinaryRecordScalarWhereInput
    data: XOR<DisciplinaryRecordUpdateManyMutationInput, DisciplinaryRecordUncheckedUpdateManyWithoutOffenceTypeInput>
  }

  export type StudentCreateWithoutRecordsInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kursus: KursusCreateNestedOneWithoutStudentsInput
    warningLetters?: WarningLetterCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutRecordsInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    kursusId: number
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    warningLetters?: WarningLetterUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutRecordsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
  }

  export type OffenceTypeCreateWithoutRecordsInput = {
    code: string
    name: string
    category: string
    description?: string | null
  }

  export type OffenceTypeUncheckedCreateWithoutRecordsInput = {
    id?: number
    code: string
    name: string
    category: string
    description?: string | null
  }

  export type OffenceTypeCreateOrConnectWithoutRecordsInput = {
    where: OffenceTypeWhereUniqueInput
    create: XOR<OffenceTypeCreateWithoutRecordsInput, OffenceTypeUncheckedCreateWithoutRecordsInput>
  }

  export type UserCreateWithoutRecordsInput = {
    username: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutRecordsInput = {
    id?: number
    username: string
    password: string
    name: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecordsInput, UserUncheckedCreateWithoutRecordsInput>
  }

  export type WarningLetterCreateWithoutRecordsInput = {
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutWarningLettersInput
  }

  export type WarningLetterUncheckedCreateWithoutRecordsInput = {
    id?: number
    studentId: string
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WarningLetterCreateOrConnectWithoutRecordsInput = {
    where: WarningLetterWhereUniqueInput
    create: XOR<WarningLetterCreateWithoutRecordsInput, WarningLetterUncheckedCreateWithoutRecordsInput>
  }

  export type StudentUpsertWithoutRecordsInput = {
    update: XOR<StudentUpdateWithoutRecordsInput, StudentUncheckedUpdateWithoutRecordsInput>
    create: XOR<StudentCreateWithoutRecordsInput, StudentUncheckedCreateWithoutRecordsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutRecordsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutRecordsInput, StudentUncheckedUpdateWithoutRecordsInput>
  }

  export type StudentUpdateWithoutRecordsInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kursus?: KursusUpdateOneRequiredWithoutStudentsNestedInput
    warningLetters?: WarningLetterUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutRecordsInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kursusId?: IntFieldUpdateOperationsInput | number
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetters?: WarningLetterUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type OffenceTypeUpsertWithoutRecordsInput = {
    update: XOR<OffenceTypeUpdateWithoutRecordsInput, OffenceTypeUncheckedUpdateWithoutRecordsInput>
    create: XOR<OffenceTypeCreateWithoutRecordsInput, OffenceTypeUncheckedCreateWithoutRecordsInput>
    where?: OffenceTypeWhereInput
  }

  export type OffenceTypeUpdateToOneWithWhereWithoutRecordsInput = {
    where?: OffenceTypeWhereInput
    data: XOR<OffenceTypeUpdateWithoutRecordsInput, OffenceTypeUncheckedUpdateWithoutRecordsInput>
  }

  export type OffenceTypeUpdateWithoutRecordsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OffenceTypeUncheckedUpdateWithoutRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpsertWithoutRecordsInput = {
    update: XOR<UserUpdateWithoutRecordsInput, UserUncheckedUpdateWithoutRecordsInput>
    create: XOR<UserCreateWithoutRecordsInput, UserUncheckedCreateWithoutRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecordsInput, UserUncheckedUpdateWithoutRecordsInput>
  }

  export type UserUpdateWithoutRecordsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarningLetterUpsertWithoutRecordsInput = {
    update: XOR<WarningLetterUpdateWithoutRecordsInput, WarningLetterUncheckedUpdateWithoutRecordsInput>
    create: XOR<WarningLetterCreateWithoutRecordsInput, WarningLetterUncheckedCreateWithoutRecordsInput>
    where?: WarningLetterWhereInput
  }

  export type WarningLetterUpdateToOneWithWhereWithoutRecordsInput = {
    where?: WarningLetterWhereInput
    data: XOR<WarningLetterUpdateWithoutRecordsInput, WarningLetterUncheckedUpdateWithoutRecordsInput>
  }

  export type WarningLetterUpdateWithoutRecordsInput = {
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutWarningLettersNestedInput
  }

  export type WarningLetterUncheckedUpdateWithoutRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateWithoutWarningLettersInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kursus: KursusCreateNestedOneWithoutStudentsInput
    records?: DisciplinaryRecordCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutWarningLettersInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    kursusId: number
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: DisciplinaryRecordUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutWarningLettersInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutWarningLettersInput, StudentUncheckedCreateWithoutWarningLettersInput>
  }

  export type DisciplinaryRecordCreateWithoutWarningLetterInput = {
    date?: Date | string
    description: string
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutRecordsInput
    offenceType: OffenceTypeCreateNestedOneWithoutRecordsInput
    teacher: UserCreateNestedOneWithoutRecordsInput
  }

  export type DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
  }

  export type DisciplinaryRecordCreateOrConnectWithoutWarningLetterInput = {
    where: DisciplinaryRecordWhereUniqueInput
    create: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput>
  }

  export type DisciplinaryRecordCreateManyWarningLetterInputEnvelope = {
    data: DisciplinaryRecordCreateManyWarningLetterInput | DisciplinaryRecordCreateManyWarningLetterInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithoutWarningLettersInput = {
    update: XOR<StudentUpdateWithoutWarningLettersInput, StudentUncheckedUpdateWithoutWarningLettersInput>
    create: XOR<StudentCreateWithoutWarningLettersInput, StudentUncheckedCreateWithoutWarningLettersInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutWarningLettersInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutWarningLettersInput, StudentUncheckedUpdateWithoutWarningLettersInput>
  }

  export type StudentUpdateWithoutWarningLettersInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kursus?: KursusUpdateOneRequiredWithoutStudentsNestedInput
    records?: DisciplinaryRecordUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutWarningLettersInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kursusId?: IntFieldUpdateOperationsInput | number
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type DisciplinaryRecordUpsertWithWhereUniqueWithoutWarningLetterInput = {
    where: DisciplinaryRecordWhereUniqueInput
    update: XOR<DisciplinaryRecordUpdateWithoutWarningLetterInput, DisciplinaryRecordUncheckedUpdateWithoutWarningLetterInput>
    create: XOR<DisciplinaryRecordCreateWithoutWarningLetterInput, DisciplinaryRecordUncheckedCreateWithoutWarningLetterInput>
  }

  export type DisciplinaryRecordUpdateWithWhereUniqueWithoutWarningLetterInput = {
    where: DisciplinaryRecordWhereUniqueInput
    data: XOR<DisciplinaryRecordUpdateWithoutWarningLetterInput, DisciplinaryRecordUncheckedUpdateWithoutWarningLetterInput>
  }

  export type DisciplinaryRecordUpdateManyWithWhereWithoutWarningLetterInput = {
    where: DisciplinaryRecordScalarWhereInput
    data: XOR<DisciplinaryRecordUpdateManyMutationInput, DisciplinaryRecordUncheckedUpdateManyWithoutWarningLetterInput>
  }

  export type DisciplinaryRecordCreateManyTeacherInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordUpdateWithoutTeacherInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRecordsNestedInput
    offenceType?: OffenceTypeUpdateOneRequiredWithoutRecordsNestedInput
    warningLetter?: WarningLetterUpdateOneWithoutRecordsNestedInput
  }

  export type DisciplinaryRecordUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordCreateManyStudentInput = {
    id?: number
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type WarningLetterCreateManyStudentInput = {
    id?: number
    warningTier: number
    issuedDate?: Date | string
    status: string
    month: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisciplinaryRecordUpdateWithoutStudentInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offenceType?: OffenceTypeUpdateOneRequiredWithoutRecordsNestedInput
    teacher?: UserUpdateOneRequiredWithoutRecordsNestedInput
    warningLetter?: WarningLetterUpdateOneWithoutRecordsNestedInput
  }

  export type DisciplinaryRecordUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WarningLetterUpdateWithoutStudentInput = {
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUpdateManyWithoutWarningLetterNestedInput
  }

  export type WarningLetterUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutWarningLetterNestedInput
  }

  export type WarningLetterUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    warningTier?: IntFieldUpdateOperationsInput | number
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyKursusInput = {
    studentNumber: string
    icNumber: string
    name: string
    email?: string | null
    studentPhone?: string | null
    cohort: number
    programType: string
    semester: number
    status?: string
    parentName: string
    parentPhone: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateWithoutKursusInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUpdateManyWithoutStudentNestedInput
    warningLetters?: WarningLetterUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutKursusInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: DisciplinaryRecordUncheckedUpdateManyWithoutStudentNestedInput
    warningLetters?: WarningLetterUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutKursusInput = {
    studentNumber?: StringFieldUpdateOperationsInput | string
    icNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    studentPhone?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: IntFieldUpdateOperationsInput | number
    programType?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaryRecordCreateManyOffenceTypeInput = {
    id?: number
    studentId: string
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
    warningLetterId?: number | null
  }

  export type DisciplinaryRecordUpdateWithoutOffenceTypeInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRecordsNestedInput
    teacher?: UserUpdateOneRequiredWithoutRecordsNestedInput
    warningLetter?: WarningLetterUpdateOneWithoutRecordsNestedInput
  }

  export type DisciplinaryRecordUncheckedUpdateWithoutOffenceTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutOffenceTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    warningLetterId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DisciplinaryRecordCreateManyWarningLetterInput = {
    id?: number
    studentId: string
    offenceTypeId: number
    teacherId: number
    date?: Date | string
    description: string
    createdAt?: Date | string
  }

  export type DisciplinaryRecordUpdateWithoutWarningLetterInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRecordsNestedInput
    offenceType?: OffenceTypeUpdateOneRequiredWithoutRecordsNestedInput
    teacher?: UserUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type DisciplinaryRecordUncheckedUpdateWithoutWarningLetterInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisciplinaryRecordUncheckedUpdateManyWithoutWarningLetterInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    offenceTypeId?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KursusCountOutputTypeDefaultArgs instead
     */
    export type KursusCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KursusCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OffenceTypeCountOutputTypeDefaultArgs instead
     */
    export type OffenceTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OffenceTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarningLetterCountOutputTypeDefaultArgs instead
     */
    export type WarningLetterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarningLetterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KursusDefaultArgs instead
     */
    export type KursusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KursusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OffenceTypeDefaultArgs instead
     */
    export type OffenceTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OffenceTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisciplinaryRecordDefaultArgs instead
     */
    export type DisciplinaryRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisciplinaryRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WarningLetterDefaultArgs instead
     */
    export type WarningLetterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WarningLetterDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}