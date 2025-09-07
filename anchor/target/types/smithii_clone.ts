/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/smithii_clone.json`.
 */
export type SmithiiClone = {
    "address": "7yJH3HYBnH4N4E8G9HKRThhwLfs6NmhGASQJyr5bmtb3",
    "metadata": {
        "name": "smithiiClone",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "claimRewards",
            "discriminator": [
                4,
                144,
                132,
                71,
                116,
                23,
                151,
                80
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "userStake",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    107,
                                    101
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "globalState",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "userRewardAccount",
                    "writable": true
                },
                {
                    "name": "rewardVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    114,
                                    101,
                                    119,
                                    97,
                                    114,
                                    100,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "platformFeeVault",
                    "writable": true
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": []
        },
        {
            "name": "createStakingPool",
            "discriminator": [
                104,
                58,
                70,
                37,
                225,
                212,
                145,
                93
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    107,
                                    105,
                                    110,
                                    103,
                                    95,
                                    112,
                                    111,
                                    111,
                                    108
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "creator"
                            },
                            {
                                "kind": "account",
                                "path": "stakeTokenMint"
                            }
                        ]
                    }
                },
                {
                    "name": "globalState",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "creator",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "stakeTokenMint"
                },
                {
                    "name": "rewardTokenMint"
                },
                {
                    "name": "stakeVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    107,
                                    101,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "rewardVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    114,
                                    101,
                                    119,
                                    97,
                                    114,
                                    100,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "config",
                    "type": {
                        "defined": {
                            "name": "stakingPoolConfig"
                        }
                    }
                },
                {
                    "name": "metadataUri",
                    "type": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string"
                }
            ]
        },
        {
            "name": "fundRewardPool",
            "discriminator": [
                85,
                49,
                108,
                245,
                204,
                70,
                243,
                3
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "funder",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "funderRewardAccount",
                    "writable": true
                },
                {
                    "name": "rewardVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    114,
                                    101,
                                    119,
                                    97,
                                    114,
                                    100,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "initializeGlobalState",
            "discriminator": [
                232,
                254,
                209,
                244,
                123,
                89,
                154,
                207
            ],
            "accounts": [
                {
                    "name": "globalState",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    115,
                                    116,
                                    97,
                                    116,
                                    101
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformFeeVault"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "platformFeeBps",
                    "type": "u16"
                }
            ]
        },
        {
            "name": "pausePool",
            "discriminator": [
                160,
                15,
                12,
                189,
                160,
                0,
                243,
                245
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "creator",
                    "signer": true
                }
            ],
            "args": []
        },
        {
            "name": "stake",
            "discriminator": [
                206,
                176,
                202,
                18,
                200,
                209,
                179,
                108
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "userStake",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    107,
                                    101
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "userStakeAccount",
                    "writable": true
                },
                {
                    "name": "stakeVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    107,
                                    101,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "lockupDuration",
                    "type": "i64"
                }
            ]
        },
        {
            "name": "unstake",
            "discriminator": [
                90,
                95,
                107,
                42,
                205,
                124,
                50,
                225
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "userStake",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114,
                                    95,
                                    115,
                                    116,
                                    97,
                                    107,
                                    101
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "userStakeAccount",
                    "writable": true
                },
                {
                    "name": "stakeVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    115,
                                    116,
                                    97,
                                    107,
                                    101,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "stakingPool"
                            }
                        ]
                    }
                },
                {
                    "name": "creatorPenaltyAccount",
                    "writable": true
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "updateRewardRate",
            "discriminator": [
                105,
                157,
                0,
                185,
                21,
                144,
                163,
                159
            ],
            "accounts": [
                {
                    "name": "stakingPool",
                    "writable": true
                },
                {
                    "name": "creator",
                    "signer": true
                }
            ],
            "args": [
                {
                    "name": "newRate",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "globalState",
            "discriminator": [
                163,
                46,
                74,
                168,
                216,
                123,
                133,
                98
            ]
        },
        {
            "name": "stakingPool",
            "discriminator": [
                203,
                19,
                214,
                220,
                220,
                154,
                24,
                102
            ]
        },
        {
            "name": "userStake",
            "discriminator": [
                102,
                53,
                163,
                107,
                9,
                138,
                87,
                153
            ]
        }
    ],
    "events": [
        {
            "name": "poolCreated",
            "discriminator": [
                202,
                44,
                41,
                88,
                104,
                220,
                157,
                82
            ]
        },
        {
            "name": "poolFunded",
            "discriminator": [
                164,
                221,
                242,
                68,
                164,
                64,
                24,
                214
            ]
        },
        {
            "name": "poolPaused",
            "discriminator": [
                228,
                218,
                62,
                53,
                29,
                211,
                159,
                236
            ]
        },
        {
            "name": "rewardRateUpdated",
            "discriminator": [
                176,
                128,
                176,
                106,
                40,
                165,
                210,
                144
            ]
        },
        {
            "name": "rewardsClaimed",
            "discriminator": [
                75,
                98,
                88,
                18,
                219,
                112,
                88,
                121
            ]
        },
        {
            "name": "tokensStaked",
            "discriminator": [
                220,
                130,
                145,
                142,
                109,
                123,
                38,
                100
            ]
        },
        {
            "name": "tokensUnstaked",
            "discriminator": [
                137,
                203,
                131,
                80,
                135,
                107,
                181,
                150
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "invalidRewardRate",
            "msg": "Invalid reward rate"
        },
        {
            "code": 6001,
            "name": "belowMinStake",
            "msg": "Amount below minimum stake requirement"
        },
        {
            "code": 6002,
            "name": "exceedsMaxStake",
            "msg": "Amount exceeds maximum stake per user"
        },
        {
            "code": 6003,
            "name": "poolInactive",
            "msg": "Pool is not active"
        },
        {
            "code": 6004,
            "name": "noStakeFound",
            "msg": "No stake found for user"
        },
        {
            "code": 6005,
            "name": "insufficientStake",
            "msg": "Insufficient staked amount"
        },
        {
            "code": 6006,
            "name": "noRewardsToClaim",
            "msg": "No rewards to claim"
        },
        {
            "code": 6007,
            "name": "unauthorized",
            "msg": "Unauthorized action"
        },
        {
            "code": 6008,
            "name": "invalidPenalty",
            "msg": "Invalid penalty percentage"
        },
        {
            "code": 6009,
            "name": "invalidMinStake",
            "msg": "Invalid minimum stake amount"
        },
        {
            "code": 6010,
            "name": "poolAtMaxSize",
            "msg": "Pool has reached maximum size"
        }
    ],
    "types": [
        {
            "name": "globalState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "admin",
                        "type": "pubkey"
                    },
                    {
                        "name": "platformFeeBps",
                        "type": "u16"
                    },
                    {
                        "name": "totalPoolsCreated",
                        "type": "u64"
                    },
                    {
                        "name": "platformFeeVault",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "poolCreated",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator",
                        "type": "pubkey"
                    },
                    {
                        "name": "stakeToken",
                        "type": "pubkey"
                    },
                    {
                        "name": "rewardToken",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "poolFunded",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "funder",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "poolPaused",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "rewardRateUpdated",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "oldRate",
                        "type": "u64"
                    },
                    {
                        "name": "newRate",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "rewardsClaimed",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "platformFee",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "stakingPool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creator",
                        "type": "pubkey"
                    },
                    {
                        "name": "stakeTokenMint",
                        "type": "pubkey"
                    },
                    {
                        "name": "rewardTokenMint",
                        "type": "pubkey"
                    },
                    {
                        "name": "rewardVault",
                        "type": "pubkey"
                    },
                    {
                        "name": "config",
                        "type": {
                            "defined": {
                                "name": "stakingPoolConfig"
                            }
                        }
                    },
                    {
                        "name": "totalStaked",
                        "type": "u64"
                    },
                    {
                        "name": "totalStakers",
                        "type": "u64"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "decimals",
                        "type": "u8"
                    },
                    {
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "name": "metadataUri",
                        "type": "string"
                    },
                    {
                        "name": "tokenSymbol",
                        "type": "string"
                    }
                ]
            }
        },
        {
            "name": "stakingPoolConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "rewardRatePerTokenPerSecond",
                        "type": "u64"
                    },
                    {
                        "name": "minStakeAmount",
                        "type": "u64"
                    },
                    {
                        "name": "maxStakePerUser",
                        "type": {
                            "option": "u64"
                        }
                    },
                    {
                        "name": "minStakeDuration",
                        "type": "i64"
                    },
                    {
                        "name": "earlyWithdrawalPenaltyBps",
                        "type": "u16"
                    },
                    {
                        "name": "maxPoolSize",
                        "type": {
                            "option": "u64"
                        }
                    },
                    {
                        "name": "poolName",
                        "type": "string"
                    },
                    {
                        "name": "poolDescription",
                        "type": "string"
                    }
                ]
            }
        },
        {
            "name": "tokensStaked",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "totalStaked",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "tokensUnstaked",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool",
                        "type": "pubkey"
                    },
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "penalty",
                        "type": "u64"
                    },
                    {
                        "name": "returned",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "userStake",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "stakingPool",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "pendingRewards",
                        "type": "u64"
                    },
                    {
                        "name": "totalClaimed",
                        "type": "u64"
                    },
                    {
                        "name": "startTime",
                        "type": "i64"
                    },
                    {
                        "name": "lastUpdateTime",
                        "type": "i64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "lockupDuration",
                        "type": "i64"
                    }
                ]
            }
        }
    ],
    "constants": [
        {
            "name": "seed",
            "type": "string",
            "value": "\"anchor\""
        }
    ]
};