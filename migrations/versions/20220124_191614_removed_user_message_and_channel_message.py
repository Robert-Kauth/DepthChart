"""removed user_message and channel_message

Revision ID: 759a130cc18b
Revises: 2911c32722ec
Create Date: 2022-01-24 19:16:14.590148

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '759a130cc18b'
down_revision = '2911c32722ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_messages')
    op.drop_table('channel_messages')
    op.add_column('messages', sa.Column('channel_id', sa.Integer(), nullable=True))
    op.add_column('messages', sa.Column('is_channel_message', sa.Boolean(), nullable=True))
    op.add_column('messages', sa.Column('sender_id', sa.Integer(), nullable=True))
    op.add_column('messages', sa.Column('recipient_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'messages', 'users', ['recipient_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'messages', 'users', ['sender_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'messages', 'channels', ['channel_id'], ['id'], ondelete='CASCADE')
    op.drop_column('messages', 'created_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.drop_column('messages', 'recipient_id')
    op.drop_column('messages', 'sender_id')
    op.drop_column('messages', 'is_channel_message')
    op.drop_column('messages', 'channel_id')
    op.create_table('channel_messages',
    sa.Column('channel_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('sender_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('message_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], name='channel_messages_channel_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['message_id'], ['messages.id'], name='channel_messages_message_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], name='channel_messages_sender_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('channel_id', 'sender_id', 'message_id', name='channel_messages_pkey')
    )
    op.create_table('user_messages',
    sa.Column('message_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('is_read', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('sender_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('recipient_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['message_id'], ['messages.id'], name='user_messages_message_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['recipient_id'], ['users.id'], name='user_messages_recipient_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], name='user_messages_sender_id_fkey', ondelete='CASCADE')
    )
    # ### end Alembic commands ###