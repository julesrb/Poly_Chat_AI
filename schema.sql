CREATE TYPE message_role as ENUM ('user', 'ai');

CREATE TABLE IF NOT EXISTS users (
    id      BIGSERIAL PRIMARY KEY,
    name    TEXT NOT NULL
);

-- i may want to remove the delete on cascade and set it to not null later on,
-- but for now it illustrate the model i want to feel like when using it in the front.
CREATE TABLE IF NOT EXISTS categories (
    id      BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    name    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS threads (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id    BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS Conversations (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id        BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    thread_id BIGINT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id                  BIGSERIAL PRIMARY KEY,
    thread_id     BIGINT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    role                message_role NOT NULL,
    content             TEXT NOT NULL,
    metadata            JSONB,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);